import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // 启用 Ant Design 的 dark 主题
        token: {
          colorPrimary: "#1E3A8A", // 深蓝色主题
          colorBgBase: "#1E293B", // 深蓝背景
          colorTextBase: "#E0E7FF", // 浅蓝文字
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
