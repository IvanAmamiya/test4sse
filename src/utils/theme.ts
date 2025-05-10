// 主题色与渐变工具函数，统一从 themeColors/themeGradients 获取主题色值
import themeGradients from "@/styles/themeGradients.json";
import themeColors from "@/styles/themeColors.json";
import type { ThemeGradientKey, ThemeColorKey } from "@/types";

// 获取渐变色字符串（linear-gradient），type 为 themeGradients.json 的 key
export function getThemeGradient(type: ThemeGradientKey, isDark: boolean) {
  const c = isDark ? themeGradients[type].dark : themeGradients[type].light;
  return `linear-gradient(to right, ${c.join(', ')})`;
}

// 获取主题色，type 为 themeColors.json 的 key
export function getThemeColor(type: ThemeColorKey, isDark: boolean) {
  return isDark ? themeColors[type].dark : themeColors[type].light;
}
