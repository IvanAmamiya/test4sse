import { setTraining, resetTrainData, getTraining, getTrainingLock, setTrainingLock, getTrainData } from "@/utils/trainMockState";

export async function POST() {
  // 后台加锁，训练期间不可重复启动
  if (getTraining() || getTrainingLock()) {
    // 检查是否已经训练完成，如果已完成则自动解锁
    if (!getTraining() && getTrainData().length > 0 && getTrainData()[getTrainData().length - 1].currentStep === getTrainData()[getTrainData().length - 1].totalSteps) {
      setTrainingLock(false);
    } else {
      return Response.json({ ok: false, msg: "Training already in progress" }, { status: 400 });
    }
  }
  resetTrainData();
  setTrainingLock(true); // 上锁
  setTraining(true);
  return Response.json({ ok: true });
}