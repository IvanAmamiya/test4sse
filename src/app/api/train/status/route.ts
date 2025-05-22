import { getRedisClient } from '@/utils/sseMessage';

export async function GET() {
  const client = getRedisClient();
  const progress = await client.lRange('train_status', 0, -1);
  // progress 是字符串数组，需 JSON.parse
  const parsed = progress.map(item => {
    try { return JSON.parse(item); } catch { return null; }
  }).filter(Boolean);
  return Response.json({ running: parsed.length > 0, progress: parsed });
}