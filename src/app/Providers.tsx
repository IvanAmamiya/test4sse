"use client";
import '../utils/i18n';

import { ConfigProvider, App } from "antd";
import { TRPCProvider } from "../components/TRPCProvider";

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1677ff", // 全局主色
            colorBgBase: "#f0f2f5", // 全局背景色
            colorTextBase: "#000000", // 全局文字颜色
            colorBorder: "#d9d9d9", // 全局边框颜色
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </TRPCProvider>
  );
}
