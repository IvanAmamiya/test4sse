import React from "react";
import { Button } from "antd";
import { GradientButtonProps } from "@/types";
import { getThemeGradient, getThemeColor } from "@/utils/theme";

const GradientButton: React.FC<GradientButtonProps> = ({ isDark = false, onClick, children, type = "primary" }) => {
  return (
    <Button
      type={type}
      className={`transition-all duration-300 rounded cursor-pointer`}
      style={{
        background: getThemeGradient("alert", isDark),
        color: getThemeColor("text", isDark),
        margin: "4px 4px 0px 0px",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GradientButton;