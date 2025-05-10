# test4sse

这是一个基于 Next.js + TypeScript + Ant Design + Tailwind CSS 的前端项目，支持深浅色主题切换、渐变按钮、SSE 实时进度等功能。

## 主要特性
- Next.js 15 + TypeScript
- Ant Design 组件库
- Tailwind CSS 原子化样式
- 支持深色/浅色主题切换
- 主题色与渐变全局合并配置（themeConfig.json）
- 统一的 getThemeGradient/getThemeColor 工具函数
- SSE 消息流接口解耦，易于对接真实消息管道
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
│   │   ├── CustomModal.tsx           # 封装的 Modal 组件
│   │   ├── GradientButton.tsx        # 渐变按钮组件
│   │   ├── ProgressInfo.tsx          # 进度条与提示
│   │   ├── ThemeHeader.tsx           # 顶部 Header 区域
│   │   ├── ThemeSwitcher.tsx         # 主题切换按钮
│   │   └── TrainingPanel.tsx         # 输入框和按钮组
│   ├── hooks/
│   │   └── useSSEProgress.ts         # SSE 进度监听 hook
│   ├── styles/
│   │   ├── global.css                # 全局样式
│   │   ├── pageStyles.module.css     # 局部样式
│   │   └── themeConfig.json          # 全局主题色与渐变配置
│   ├── types/
│   │   └── index.ts                  # 类型定义
│   └── utils/
│       ├── sseConfig.ts              # SSE 响应头配置
│       ├── sseMessage.ts             # SSE 消息流接口（async generator）
│       └── theme.ts                  # 主题色/渐变工具函数
├── ...
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
- 主题色和渐变统一配置在 `src/styles/themeConfig.json`，分为 colors 和 gradients 两部分。
- 通过 `getThemeColor` 和 `getThemeGradient` 工具函数获取主题色和渐变色，避免硬编码。
- 组件样式推荐使用这些工具函数，便于主题扩展和维护。

## SSE 消息流接口说明
- 消息获取逻辑已抽象为 `getSSEMessageStream`（见 `src/utils/sseMessage.ts`），采用 async generator 形式，负责消息管道/轮询/间隔等所有细节。
- API 路由（`src/app/api/sse/route.ts`）通过 `for await...of getSSEMessageStream()` 消费消息流并推送到前端，完全解耦消息获取与推送。
- SSE 响应头配置集中在 `src/utils/sseConfig.ts`，便于统一维护。
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
import { SSE_HEADERS } from "@/utils/sseConfig";

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const msg of getSSEMessageStream()) {
        controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
      }
    }
  });
  return new Response(stream, { headers: SSE_HEADERS });
}
```

## 反馈与贡献
如有建议或问题，欢迎提 issue 或 PR。