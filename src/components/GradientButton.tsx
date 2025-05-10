import React from "react";
import { Button } from "antd";
import { GradientButtonProps } from "@/types";

const GradientButton: React.FC<GradientButtonProps> = ({ isDark = false, onClick, children, type = "primary" }) => {
  return (
    <Button
      type={type}
      className={`transition-all duration-300 rounded cursor-pointer`}
      style={{
        background: isDark
          ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
          : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
        color: isDark ? "#E0E7FF" : "#000000",
        margin: "4px 4px 0px 0px",      
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GradientButton;