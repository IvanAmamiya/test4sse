# test4sse

这是一个基于 Next.js 15 + TypeScript + Ant Design + Tailwind CSS 的前端项目，支持深浅色主题切换、渐变主题按钮、SSE（Server-Sent Events）进度演示等功能。

## 主要特性
- Next.js 15 App Router 架构
- Ant Design 组件库，支持深浅色主题
- Tailwind CSS 辅助样式
- 全局主题切换（深色/浅色）
- 渐变色自定义按钮（GradientButton）
- SSE 实时进度演示

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── GradientButton.tsx      # 渐变按钮组件
│   │   ├── layout.tsx             # 根布局
│   │   ├── page.tsx               # 主页面
│   │   ├── pageStyles.module.css  # 页面样式
│   │   ├── Providers.tsx          # 全局 Provider（主题等）
│   │   ├── ThemeSwitcher.tsx      # 主题切换按钮
│   │   └── api/sse/route.ts       # SSE 接口
│   └── types/index.tsx            # 主题上下文
├── global.css                     # 全局样式
├── tailwind.config.js             # Tailwind 配置
├── next.config.js                 # Next.js 配置
├── package.json                   # 依赖与脚本
```

## 启动方式
1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发环境：
   ```bash
   npm run dev
   ```
3. 访问 [http://localhost:3000](http://localhost:3000)

## 主题切换
- 页面右上角按钮可切换深浅色主题，所有 Ant Design 组件和自定义按钮会自动适配。

## SSE 进度演示
- 页面会自动通过 `/api/sse` 接口获取进度数据并实时展示。

## 依赖
- Next.js 15
- React 18
- Ant Design 5
- Tailwind CSS 3
- TypeScript 5

---
如需自定义主题、扩展功能或有其他问题，欢迎 issue 或 PR！