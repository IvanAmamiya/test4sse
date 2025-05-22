// 兼容 Redis 方案：始终返回 running: false，progress: []，由前端通过 SSE 获取真实进度
export async function GET() {
  return Response.json({ running: false, progress: [] });
}
