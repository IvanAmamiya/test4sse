import { createClient, RedisClientType } from 'redis';

// Redis 客户端单例，类型安全
let redisClient: RedisClientType | null = null;
async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    redisClient.on('error', (err) => {
      console.error('[Redis] Client error:', err);
      redisClient = null;
    });
    await redisClient.connect();
  } else if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

export async function triggerRemoteTraining(command = 'start') {
  const client = await getRedisClient();
  try {
    const beforeLen = await client.lLen('train_trigger');
    console.log(`[Redis] train_trigger 队列触发前长度: ${beforeLen}`);
    // 只推送 'start' 字符串，兼容 Python 端
    await client.rPush('train_trigger', 'start');
    const afterLen = await client.lLen('train_trigger');
    console.log(`[Redis] train_trigger 队列触发后长度: ${afterLen}`);
    const items = await client.lRange('train_trigger', 0, -1);
    console.log(`[Redis] train_trigger 队列内容:`, items);
    return true;
  } catch (err) {
    console.error('[SSE Redis] triggerRemoteTraining error:', err);
    return false;
  }
}

export async function POST() {
  // 只触发真正训练，不再推送任何模拟进度
  const ok = await triggerRemoteTraining('start');
  if (ok) {
    return Response.json({ ok: true, msg: '已触发训练' });
  } else {
    return Response.json({ ok: false, msg: '训练触发失败，请重试' }, { status: 500 });
  }
}