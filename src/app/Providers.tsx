import { App, ConfigProvider } from "antd";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff", // 默认主题色
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
