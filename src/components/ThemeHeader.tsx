import React from "react";
import { Layout, Typography } from "antd";
import GradientButton from "@/components/GradientButton";
import { getThemeGradient } from "@/utils/theme";

const { Header } = Layout;
const { Title } = Typography;

interface ThemeHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const ThemeHeader: React.FC<ThemeHeaderProps> = ({ isDark, onToggleTheme }) => (
  <Header
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: getThemeGradient("header", isDark),
    }}
  >
    <Title
      level={2}
      style={{
        backgroundImage: getThemeGradient("title", isDark),
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        margin: 0,
      }}
    >
      Anon Saijo
    </Title>
    <GradientButton isDark={isDark} onClick={onToggleTheme}>
      切换到{isDark ? "浅色" : "深色"}模式
    </GradientButton>
  </Header>
);

export default ThemeHeader;
