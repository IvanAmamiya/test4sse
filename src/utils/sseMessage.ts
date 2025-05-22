import { createClient } from 'redis';

// Redis 配置
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const TRAIN_PROGRESS_QUEUE = 'train_status';
const TRAIN_TRIGGER_QUEUE = 'train_trigger';

// Redis 客户端单例
let redisClient: ReturnType<typeof createClient> | null = null;
function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: REDIS_URL });
    redisClient.on('error', (err) => {
      console.error('[Redis] Client error:', err);
      redisClient = null;
    });
    redisClient.connect().catch((err) => {
      console.error('[Redis] Connect error:', err);
      redisClient = null;
    });
  }
  return redisClient;
}

// SSE 消费 Redis 队列训练进度
export async function* getSSEMessageStream() {
  const client = getRedisClient();
  while (true) {
    try {
      // 阻塞读取队列，超时30秒避免死等
      const res = await client.brPop(TRAIN_PROGRESS_QUEUE, 30);
      if (res && res.element) {
        yield res.element; // 只 yield 纯 JSON 字符串，不加 data: 前缀
      }
    } catch (err) {
      console.error('[SSE Redis] brPop error:', err);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

// 触发远程训练（rpush 触发队列）
export async function triggerRemoteTraining(command: string = 'start') {
  const client = getRedisClient();
  try {
    // 触发前打印当前队列状态
    const beforeLen = await client.lLen(TRAIN_TRIGGER_QUEUE);
    const res = await client.rPush(TRAIN_TRIGGER_QUEUE, command);
    const afterLen = await client.lLen(TRAIN_TRIGGER_QUEUE);
    // 触发后打印队列内容
    const items = await client.lRange(TRAIN_TRIGGER_QUEUE, 0, -1);
    return true;
  } catch (err) {
    console.error('[SSE Redis] triggerRemoteTraining error:', err);
    return false;
  }
}
