// 主题色与渐变工具函数，统一从 themeConfig 获取主题色值
import themeConfig from "@/styles/themeConfig.json";
import type { ThemeGradientKey, ThemeColorKey } from "@/types";

// 获取渐变色字符串（linear-gradient），type 为 themeConfig.json 的 key
export function getThemeGradient(type: ThemeGradientKey, isDark: boolean) {
  const c = isDark ? themeConfig.gradients[type].dark : themeConfig.gradients[type].light;
  return `linear-gradient(to right, ${c.join(', ')})`;
}

// 获取主题色，type 为 themeConfig.json 的 key
export function getThemeColor(type: ThemeColorKey, isDark: boolean) {
  const colorObj = themeConfig.colors[type];
  if (!colorObj) {
    console.warn(`[getThemeColor] 未找到主题色 key: ${type}`);
    return isDark ? '#222' : '#eee'; // 默认色
  }
  return isDark ? colorObj.dark : colorObj.light;
}
