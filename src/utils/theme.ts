import themeGradients from "@/styles/themeGradients.json";
import themeColors from "@/styles/themeColors.json";
import type { ThemeGradientKey, ThemeColorKey } from "@/types";

export function getThemeGradient(type: ThemeGradientKey, isDark: boolean) {
  const c = isDark ? themeGradients[type].dark : themeGradients[type].light;
  return `linear-gradient(to right, ${c.join(', ')})`;
}

export function getThemeColor(type: ThemeColorKey, isDark: boolean) {
  return isDark ? themeColors[type].dark : themeColors[type].light;
}
