import { appendTrainData, getTrainData, getTraining, setTraining } from "@/utils/trainMockState";

// mock 训练数据生成器（独立于 SSE）
let trainingInterval: NodeJS.Timeout | null = null;

function startMockTraining() {
  if (trainingInterval) return; // 已在训练中
  let step = getTrainData().length;
  let loss = step > 0 ? getTrainData()[step - 1].loss : 1;
  let accuracy = step > 0 ? getTrainData()[step - 1].accuracy : 0;
  trainingInterval = setInterval(() => {
    if (!getTraining()) {
      clearInterval(trainingInterval!);
      trainingInterval = null;
      return;
    }
    step++;
    loss = Math.max(0.05, loss * 0.8 + Math.random() * 0.05);
    accuracy = Math.min(1, accuracy + 0.05 + Math.random() * 0.05);
    const data = { step, loss: Number(loss.toFixed(3)), accuracy: Number(accuracy.toFixed(3)) };
    appendTrainData(data);
    if (step >= 20) {
      setTraining(false);
      clearInterval(trainingInterval!);
      trainingInterval = null;
    }
  }, 2000); // 2秒一条
}

// SSE 消费当前训练进度
export async function* getSSEMessageStream() {
  let lastIdx = 0;
  while (true) {
    if (getTraining()) startMockTraining();
    const allData = getTrainData();
    if (lastIdx < allData.length) {
      for (; lastIdx < allData.length; lastIdx++) {
        yield JSON.stringify(allData[lastIdx]);
      }
    }
    await new Promise(res => setTimeout(res, 1000));
  }
}
