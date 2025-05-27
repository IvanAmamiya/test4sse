import { initTRPC } from '@trpc/server';
import { z } from 'zod';

/**
 * tRPC 核心配置
 * 创建 tRPC 实例和基础工具
 */
const t = initTRPC.create();

/**
 * 基础路由创建工具
 */
export const router = t.router;

/**
 * 公开程序，任何人都可以调用
 */
export const publicProcedure = t.procedure;

/**
 * 中间件创建工具
 */
export const middleware = t.middleware;

/**
 * 合并路由工具
 */
export const mergeRouters = t.mergeRouters;

/**
 * 输入验证工具
 */
export { z };
