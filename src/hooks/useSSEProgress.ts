import { useEffect } from "react";
import type { TrainDataPoint } from "../types";

// 类型定义集中到 types/index.ts
export * from "../types/index";

// 只返回 data 和 progress，训练状态由 page.tsx 控制
export function useSSEProgress(
  isTraining: boolean,
  setData: React.Dispatch<React.SetStateAction<TrainDataPoint[]>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    if (!isTraining) return;
    setData([]); // 训练开始时清空曲线
    setProgress(0);
    const eventSource = new EventSource("/api/sse");
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (typeof parsed.step === "number" && typeof parsed.totalSteps === "number") {
          setData((prev) => [...prev, parsed]);
          setProgress(Math.round((parsed.currentStep / parsed.totalSteps) * 100));
        }
      } catch {}
    };
    return () => eventSource.close();
  }, [isTraining, setData, setProgress]);
}
