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
    console.log(eventSource);
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        // 兼容 Python 端推送的 epoch/step/currentStep 格式
        const currentStep =
          typeof parsed.currentStep === "number"
            ? parsed.currentStep
            : typeof parsed.step === "number"
            ? parsed.step
            : typeof parsed.epoch === "number"
            ? parsed.epoch
            : undefined;
        const totalSteps =
          typeof parsed.totalSteps === "number"
            ? parsed.totalSteps
            : typeof parsed.maxEpoch === "number"
            ? parsed.maxEpoch
            : undefined;
        if (typeof currentStep === "number" && typeof totalSteps === "number") {
          setData((prev) => [...prev, { ...parsed, currentStep, totalSteps }]);
          setProgress(Math.round((currentStep / totalSteps) * 100));
        }
      } catch {}
    };
    return () => eventSource.close();
  }, [isTraining, setData, setProgress]);
}
