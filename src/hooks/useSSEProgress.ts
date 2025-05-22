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
    eventSource.onopen = () => {};
    eventSource.onerror = (e) => console.error('[useSSEProgress] SSE error:', e);
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        // 1. 百分比直接用 progress 字段
        if (typeof parsed.progress === "number") {
          setProgress(Number((parsed.progress * 100).toFixed(2)));
        }
        // 2. loss 曲线每 batch 一个点，accuracy 曲线每 epoch 一个点
        setData(prev => {
          let next = [...prev];
          // loss 曲线：每 batch 一个点
          if (typeof parsed.batch === "number" && typeof parsed.loss === "number") {
            const key = typeof parsed.global_batch === "number" ? parsed.global_batch : (typeof parsed.step === "number" ? parsed.step : undefined);
            const filtered = key !== undefined ? next.filter(item => (item.global_batch ?? item.step) !== key) : next;
            next = [
              ...filtered,
              {
                ...parsed,
                step: typeof parsed.global_batch === "number" ? parsed.global_batch : (typeof parsed.step === "number" ? parsed.step : 0),
                epoch: parsed.epoch,
                batch: parsed.batch,
                loss: typeof parsed.test_loss === "number" ? parsed.test_loss : parsed.loss,
                accuracy: typeof parsed.test_acc === "number" ? parsed.test_acc : (typeof parsed.accuracy === "number" ? parsed.accuracy : undefined),
                global_batch: parsed.global_batch,
                total_batches: parsed.total_batches,
                total_batches_all: parsed.total_batches_all,
                progress: parsed.progress
              }
            ];
          }
          // accuracy 曲线：每个 epoch 只保留一个点（有 test_acc/accuracy 字段时，且该 epoch 尚未追加）
          const acc = typeof parsed.test_acc === "number" ? parsed.test_acc : (typeof parsed.accuracy === "number" ? parsed.accuracy : undefined);
          if (acc !== undefined && typeof parsed.epoch === "number") {
            const hasEpoch = next.some(item => item.accuracy !== undefined && item.epoch === parsed.epoch && item.batch === undefined);
            if (!hasEpoch) {
              next = [
                ...next,
                {
                  epoch: parsed.epoch,
                  batch: undefined, // 标记为 epoch 点
                  step: parsed.epoch, // 横坐标用 epoch
                  loss: undefined,
                  accuracy: acc,
                  global_batch: undefined,
                  total_batches: parsed.total_batches,
                  total_batches_all: parsed.total_batches_all,
                  progress: parsed.progress
                }
              ];
            }
          }
          return next;
        });
      } catch (err) {}
    };
    return () => {
      eventSource.close();
    };
  }, [isTraining, setData, setProgress]);
}
