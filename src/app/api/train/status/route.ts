import { getTraining, getTrainData } from "@/utils/trainMockState";

export async function GET() {
  return Response.json({ running: getTraining(), progress: getTrainData() });
}
