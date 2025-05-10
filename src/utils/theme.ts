import gradients from "@/styles/gradients.json";
import colors from "@/styles/colors.json";
import { GradientKey, ColorKey } from "@/types";

export function getGradient(type: GradientKey, isDark: boolean) {
  const c = isDark ? gradients[type].dark : gradients[type].light;
  return `linear-gradient(to right, ${c.join(', ')})`;
}

export function getColor(type: ColorKey, isDark: boolean) {
  return isDark ? colors[type].dark : colors[type].light;
}
