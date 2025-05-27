import { EventEmitter } from 'events';
import type { TrainDataPoint } from '../types';

// 内存队列配置
const TRAIN_PROGRESS_QUEUE = 'train_status';

// 事件发射器用于 SSE 通信
class TrainingEventEmitter extends EventEmitter {}
const trainingEvents = new TrainingEventEmitter();
trainingEvents.setMaxListeners(50); // 增加最大监听器数量

// 内存队列存储训练进度消息
let progressQueue: string[] = [];
let isTrainingActive = false;

// SSE 消费内存队列训练进度
export async function* getSSEMessageStream() {
  while (true) {
    try {
      // 检查队列中是否有消息
      if (progressQueue.length > 0) {
        const message = progressQueue.shift();
        if (message) {
          console.log('[SSE Memory] 发送训练进度消息:', message);
          yield message; // 只 yield 纯 JSON 字符串，不加 data: 前缀
        }
      } else {
        // 队列为空时等待新消息事件
        await new Promise((resolve) => {
          const timeout = setTimeout(resolve, 1000); // 1秒超时
          trainingEvents.once('newMessage', () => {
            clearTimeout(timeout);
            resolve(null);
          });
        });
      }
    } catch (err) {
      console.error('[SSE Memory] 处理错误:', err);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

// 发送 SSE 消息到内存队列
export async function sendSSEMessage(data: TrainDataPoint) {
  try {
    const message = JSON.stringify(data);
    progressQueue.push(message);
    console.log(`[Memory] 发送训练进度消息:`, message);
    
    // 发射新消息事件，通知 SSE 流
    trainingEvents.emit('newMessage');
    return true;
  } catch (err) {
    console.error('[SSE Memory] sendSSEMessage error:', err);
    return false;
  }
}

// 检查队列是否为空
export async function isQueueEmpty() {
  try {
    return progressQueue.length === 0;
  } catch (err) {
    console.error('[SSE Memory] isQueueEmpty error:', err);
    return true; // 出错时默认认为队列为空
  }
}

// 触发训练启动（模拟训练过程）
export async function triggerTraining(epochs: number = 10) {
  if (isTrainingActive) {
    console.log('[Training] 训练已在进行中');
    return false;
  }
  
  isTrainingActive = true;
  console.log(`[Training] 开始模拟训练，共 ${epochs} 个 epoch`);
  
  // 模拟训练过程
  setTimeout(async () => {
    for (let epoch = 1; epoch <= epochs; epoch++) {
      if (!isTrainingActive) break;
      
      // 模拟每个 epoch 的训练
      const progress = epoch / epochs;
      const test_loss = Math.max(0.001, 1.0 * Math.exp(-epoch * 0.5) + Math.random() * 0.1);
      const test_acc = Math.min(1.0, 0.1 + (epoch / epochs) * 0.9 + Math.random() * 0.05);
      const ood_acc = Math.min(1.0, 0.05 + (epoch / epochs) * 0.3 + Math.random() * 0.03);
      
      await sendSSEMessage({
        type: 'progress',
        message: `Epoch ${epoch}/${epochs} completed`,
        progress: progress,
        epoch: epoch,
        maxEpoch: epochs,
        test_loss: test_loss,
        test_acc: test_acc,
        ood_acc: ood_acc,
        timestamp: Math.floor(Date.now() / 1000),
      });
      
      // 每个 epoch 间隔 2 秒
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // 训练完成
    if (isTrainingActive) {
      await sendSSEMessage({
        type: 'complete',
        message: 'Training completed successfully',
        progress: 1.0,
        epoch: epochs,
        maxEpoch: epochs,
        test_loss: null,
        test_acc: null,
        ood_acc: null,
        timestamp: Math.floor(Date.now() / 1000),
      });
    }
    
    isTrainingActive = false;
    console.log('[Training] 训练结束');
  }, 1000); // 1秒后开始训练
  
  return true;
}

// 停止训练
export async function stopTraining() {
  if (!isTrainingActive) {
    console.log('[Training] 没有正在进行的训练');
    return false;
  }
  
  isTrainingActive = false;
  console.log('[Training] 训练已停止');
  
  await sendSSEMessage({
    type: 'stop',
    message: 'Training stopped by user',
    progress: 0,
    epoch: 0,
    maxEpoch: 0,
    test_loss: null,
    test_acc: null,
    ood_acc: null,
    timestamp: Math.floor(Date.now() / 1000),
  });
  
  return true;
}

// 清空队列
export async function clearQueue() {
  progressQueue = [];
  console.log('[Memory] 队列已清空');
  return true;
}

// 获取训练状态
export function getTrainingStatus() {
  return {
    isActive: isTrainingActive,
    queueLength: progressQueue.length,
  };
}
