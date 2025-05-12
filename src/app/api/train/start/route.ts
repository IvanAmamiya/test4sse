import { setTraining, resetTrainData, getTraining, getTrainingLock, setTrainingLock } from "@/utils/trainMockState";

export async function POST() {
  // 后台加锁，训练期间不可重复启动
  if (getTraining() || getTrainingLock()) {
    return Response.json({ ok: false, msg: "Training already in progress" }, { status: 400 });
  }
  resetTrainData();
  setTrainingLock(true); // 上锁
  setTraining(true);
  return Response.json({ ok: true });
}