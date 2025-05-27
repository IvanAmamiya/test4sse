import { useEffect } from "react";
import type { TrainDataPoint } from "../types";

export default function useSSEProgress(
  isTraining: boolean,
  setData: React.Dispatch<React.SetStateAction<TrainDataPoint[]>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    if (!isTraining) return;
    
    setData([]);
    setProgress(0);
    
    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    
    const connectSSE = () => {
      eventSource = new EventSource("/api/sse");
      
      eventSource.onopen = () => {
        console.log('[useSSEProgress] SSE connected');
      };
      
      eventSource.onerror = (e) => {
        console.error('[useSSEProgress] SSE error:', e);
        eventSource?.close();
        
        if (isTraining) {
          reconnectTimeout = setTimeout(() => {
            console.log('[useSSEProgress] Attempting to reconnect...');
            connectSSE();
          }, 2000);
        }
      };
      
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          console.log('[useSSEProgress] Received:', parsed);
          
          if (typeof parsed.progress === "number") {
            setProgress(Math.round(parsed.progress * 100));
          }
          
          setData(prev => {
            const newPoint: TrainDataPoint = {
              type: parsed.type || 'progress',
              message: parsed.message || '',
              progress: parsed.progress || 0,
              epoch: parsed.epoch || 0,
              maxEpoch: parsed.maxEpoch || 0,
              test_loss: parsed.test_loss,
              test_acc: parsed.test_acc,
              ood_acc: parsed.ood_acc,
              timestamp: parsed.timestamp || Math.floor(Date.now() / 1000),
            };
            
            return [...prev, newPoint];
          });
        } catch (err) {
          console.error('[useSSEProgress] Parse error:', err);
        }
      };
    };
    
    connectSSE();
    
    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      eventSource?.close();
    };
  }, [isTraining, setData, setProgress]);
}
