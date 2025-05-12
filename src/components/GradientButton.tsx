import React from "react";
import { Button } from "antd";
import { GradientButtonProps } from "@/types";
import { getThemeGradient, getThemeColor } from "@/utils/theme";

const GradientButton: React.FC<GradientButtonProps> = ({ isDark = false, onClick, children, type = "primary", disabled = false, style }) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={`transition-all duration-300 rounded cursor-pointer`}
      style={{
        background: getThemeGradient("alert", isDark),
        color: getThemeColor("text", isDark),
        margin: "4px 4px 0px 0px",
        height: 32,
        fontSize: 15,
        padding: "0 16px",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GradientButton;