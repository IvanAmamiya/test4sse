import { useEffect, useState } from "react";

// 训练数据类型
export interface TrainDataPoint {
  step: number;
  loss: number;
  accuracy: number;
}

// 用于监听 SSE 进度和消息的自定义 hook
export function useSSEProgress(isTraining: boolean) {
  const [data, setData] = useState<TrainDataPoint[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isTraining) return;
    const eventSource = new EventSource('/api/sse');
    eventSource.onmessage = (event) => {
      try {
        // 期望 SSE 返回 JSON 字符串
        const parsed = JSON.parse(event.data);
        if (typeof parsed.step === 'number' && typeof parsed.loss === 'number' && typeof parsed.accuracy === 'number') {
          setData(prev => [...prev, parsed]);
          setProgress(Math.min(100, Math.max(0, Math.round(parsed.accuracy * 100))));
        }
      } catch {
        // 兼容旧的纯数字进度
        const percent = Math.min(100, Math.max(0, parseInt(event.data, 10)));
        if (!isNaN(percent)) setProgress(percent);
      }
    };
    return () => {
      eventSource.close();
    };
  }, [isTraining]);

  return { data, progress };
}
