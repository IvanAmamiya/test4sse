import React from "react";
import { Layout, Typography } from "antd";
import GradientButton from "@/components/GradientButton";
import { getThemeGradient } from "@/utils/theme";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
      height: 64,
      padding: "0 24px",
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
        lineHeight: '64px',
      }}
    >
      Anon Saijo
    </Title>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LanguageSwitcher isDark={isDark} buttonStyle={{ height: 32, fontSize: 15, padding: '0 16px' }} />
        <GradientButton isDark={isDark} onClick={onToggleTheme} style={{ height: 32, fontSize: 15, padding: '0 16px' }}>
            切换到{isDark ? "浅色" : "深色"}模式
        </GradientButton>
    </div>
  </Header>
);

export default ThemeHeader;
