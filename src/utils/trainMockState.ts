// mock 训练状态和进度（模块级变量，进程级持久）
let isTraining = false;
let trainData: any[] = [];
let trainingLock = false; // 新增锁

export function setTraining(val: boolean) {
  isTraining = val;
  if (!val) trainingLock = false; // 训练结束自动解锁
}
export function appendTrainData(data: any) {
  trainData.push(data);
}
export function resetTrainData() {
  trainData = [];
}
export function getTrainData() {
  return trainData;
}
export function getTraining() {
  return isTraining;
}
export function getTrainingLock() {
  return trainingLock;
}
export function setTrainingLock(val: boolean) {
  trainingLock = val;
}

// 合并 trainMockState.ts 到 sseMessage.ts，移除 trainMockState.ts
