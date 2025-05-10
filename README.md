# test4sse

这是一个基于 Next.js + TypeScript + Ant Design + Tailwind CSS 的前端项目，支持深浅色主题切换、渐变按钮、SSE 实时进度等功能。

## 主要特性
- Next.js 15 + TypeScript
- Ant Design 组件库
- Tailwind CSS 原子化样式
- 支持深色/浅色主题切换
- 自定义渐变按钮组件（GradientButton）
- 使用自定义 CSS 类实现渐变背景和文字色
- 支持服务端推送（SSE）实时进度展示
- ESLint + Prettier 统一代码风格

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── GradientButton.tsx         # 渐变按钮组件
│   │   ├── layout.tsx                # 页面布局
│   │   ├── page.tsx                  # 主页入口
│   │   ├── pageStyles.module.css     # 自定义样式（含深浅色渐变等）
│   │   ├── Providers.tsx             # 主题等全局 Provider
│   │   ├── ThemeSwitcher.tsx         # 主题切换按钮
│   │   └── api/sse/route.ts          # SSE 接口
│   └── types/
│       └── index.tsx
├── types/
│   └── index.ts
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

## 说明
- 渐变按钮样式通过自定义 CSS 类（如 gradientBackgroundDark、textColorDark）实现。
- 主题切换通过 isDark 状态和自定义类切换实现。
- @apply 仅用于 Tailwind 原子类，渐变等自定义样式直接写在 CSS 类中。
- ESLint/Prettier 配置已集成，VSCode 可自动格式化和纠错。

## 反馈与贡献
如有建议或问题，欢迎提 issue 或 PR。