import { useEffect, useState } from "react";

// 用于监听 SSE 进度和消息的自定义 hook
export function useSSEProgress() {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');
    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      const percent = Math.min(100, Math.max(0, parseInt(event.data, 10)));
      if (!isNaN(percent)) setProgress(percent);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return { messages, progress };
}
