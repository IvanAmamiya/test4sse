# test4sse

这是一个基于 Next.js + TypeScript + Ant Design + Tailwind CSS 的前端项目，支持深浅色主题切换、渐变按钮、SSE 实时进度等功能。

## 主要特性
- Next.js 15 + TypeScript
- Ant Design 组件库
- Tailwind CSS 原子化样式
- 支持深色/浅色主题切换
- 渐变按钮与主题色全局配置（themeGradients.json/themeColors.json）
- 统一的 getThemeGradient/getThemeColor 工具函数
- 服务端推送（SSE）实时进度展示
- ESLint + Prettier 统一代码风格

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── layout.tsx                # 页面布局
│   │   ├── page.tsx                  # 主页入口，主题切换、进度展示等
│   │   ├── Providers.tsx             # 全局 Provider
│   │   └── api/sse/route.ts          # SSE 接口
│   ├── components/
│   │   ├── GradientButton.tsx        # 渐变按钮组件
│   │   └── ThemeSwitcher.tsx         # 主题切换按钮
│   ├── styles/
│   │   ├── global.css                # 全局样式
│   │   ├── pageStyles.module.css     # 局部样式
│   │   ├── themeGradients.json       # 全局渐变配置
│   │   └── themeColors.json          # 全局主题色配置
│   ├── types/
│   │   └── index.ts                  # 类型定义
│   └── utils/
│       └── theme.ts                  # 主题色/渐变工具函数
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── .eslintrc.json
├── global.css
```

## 启动开发环境
```bash
npm install
npm run dev
```

## 代码风格检查与修复
```bash
npm run lint
npm run format
```

## 主题与渐变体系说明
- 主题色和渐变统一配置在 `src/styles/themeColors.json` 和 `src/styles/themeGradients.json`。
- 通过 `getThemeColor` 和 `getThemeGradient` 工具函数获取主题色和渐变色，避免硬编码。
- 组件样式推荐使用这些工具函数，便于主题扩展和维护。

## SSE 消息流接口说明

- 消息获取逻辑已抽象为 `getSSEMessageStream`（见 `src/utils/sseMessage.ts`），采用 async generator 形式，负责消息管道/轮询/间隔等所有细节。
- API 路由（`src/app/api/sse/route.ts`）通过 `for await...of getSSEMessageStream()` 消费消息流并推送到前端，完全解耦消息获取与推送。
- 未来如需对接真实消息管道，只需修改 `getSSEMessageStream` 的实现，无需改动 API 路由。
- 当前 mock 实现为每 2 秒产出一条自增数字消息。

示例：
```ts
// src/utils/sseMessage.ts
export async function* getSSEMessageStream() {
  let count = 0;
  while (true) {
    count++;
    await new Promise(res => setTimeout(res, 2000));
    yield String(count);
  }
}
```

```ts
// src/app/api/sse/route.ts
import { getSSEMessageStream } from "@/utils/sseMessage";

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const msg of getSSEMessageStream()) {
        controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
      }
    }
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}
```

## 反馈与贡献
如有建议或问题，欢迎提 issue 或 PR。