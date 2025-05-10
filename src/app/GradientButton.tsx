import React from "react";
import { Button } from "antd";
import styles from "./pageStyles.module.css";

interface GradientButtonProps {
  className?: string; // 添加 className 属性支持
  isDark?: boolean; // 将 isDark 设置为可选属性
  type?: "button" | "submit" | "reset" | "primary"; // 添加 "primary" 类型支持
  style?: React.CSSProperties; // 添加 style 属性支持
  onClick: () => void;
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ isDark = false, onClick, children }) => {
  return (
    <Button
      type="primary"
      className={`transition-all duration-300 rounded cursor-pointer`}
      style={{
        border: isDark ? "none" : undefined,
        background: isDark
          ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
          : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
        color: isDark ? "#E0E7FF" : "#000000",
        margin: "0 3px"
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GradientButton;