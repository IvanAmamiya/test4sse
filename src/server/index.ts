import { router } from './trpc';
import { trainRouter } from './routers/train';

/**
 * 主路由，合并所有子路由
 */
export const appRouter = router({
  train: trainRouter,
});

export type AppRouter = typeof appRouter;
