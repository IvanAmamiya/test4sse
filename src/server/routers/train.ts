import { router, publicProcedure, z } from '../trpc';
import { 
  sendSSEMessage, 
  triggerTraining, 
  stopTraining, 
  isQueueEmpty, 
  clearQueue, 
  getTrainingStatus 
} from '../../utils/sseMessage';

/**
 * 训练模块路由
 */
export const trainRouter = router({
  /**
   * 开始训练
   */
  start: publicProcedure
    .input(
      z.object({
        epochs: z.number().min(1).max(1000).default(10),
        learningRate: z.number().min(0.0001).max(1).default(0.001),
        batchSize: z.number().min(1).max(512).default(32),
      })
    )
    .mutation(async ({ input }) => {
      console.log('Starting training with parameters:', input);
      
      try {
        // 触发训练
        const success = await triggerTraining(input.epochs);
        
        if (!success) {
          throw new Error('Training is already in progress');
        }

        return {
          success: true,
          message: 'Training started successfully',
          maxEpoch: input.epochs,
        };
      } catch (error) {
        console.error('Failed to start training:', error);
        throw new Error('Failed to start training');
      }
    }),

  /**
   * 检查训练队列是否为空
   */
  checkQueueEmpty: publicProcedure
    .query(async () => {
      try {
        const isEmpty = await isQueueEmpty();
        
        return {
          isEmpty,
          message: isEmpty ? 'Queue is empty' : 'Queue has pending items',
        };
      } catch (error) {
        console.error('Failed to check queue status:', error);
        throw new Error('Failed to check queue status');
      }
    }),

  /**
   * 停止训练
   */
  stop: publicProcedure
    .mutation(async () => {
      try {
        const success = await stopTraining();
        
        return {
          success,
          message: success ? 'Training stopped successfully' : 'No training in progress',
        };
      } catch (error) {
        console.error('Failed to stop training:', error);
        throw new Error('Failed to stop training');
      }
    }),

  /**
   * 获取训练状态
   */
  status: publicProcedure
    .query(async () => {
      try {
        const status = getTrainingStatus();
        
        return {
          isTraining: status.isActive,
          queueLength: status.queueLength,
          message: status.isActive ? 'Training in progress' : 'Training stopped',
        };
      } catch (error) {
        console.error('Failed to get training status:', error);
        throw new Error('Failed to get training status');
      }
    }),

  /**
   * 清空队列
   */
  clearQueue: publicProcedure
    .mutation(async () => {
      try {
        await clearQueue();
        
        return {
          success: true,
          message: 'Queue cleared successfully',
        };
      } catch (error) {
        console.error('Failed to clear queue:', error);
        throw new Error('Failed to clear queue');
      }
    }),
});
