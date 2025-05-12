"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import GradientButton from "@/components/GradientButton";

interface LanguageSwitcherProps {
  isDark?: boolean; // 支持外部传递主题色
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  t: (key: string) => string;
}

const langs = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isDark, style, buttonStyle, t }) => {
  const { i18n } = useTranslation();
  const current = i18n.language;
  // const effectiveIsDark = typeof isDark === 'boolean' ? isDark : (typeof window !== 'undefined' && document.body.classList.contains('dark'));
  // 让语言按钮和主题切换按钮风格一致，直接复用 GradientButton 的 getThemeGradient/getThemeColor
  return (
    <div style={{ display: "flex", gap: 4, ...style }}>
      {langs.map(lang => {
        const selected = current === lang.code;
        return (
          <GradientButton
            isDark={isDark}
            onClick={() => i18n.changeLanguage(lang.code)}
            type={selected ? "primary" : "default"}
            style={{
              fontWeight: selected ? 700 : 400,
              border: selected ? (isDark ? '2px solid #fff' : '2px solid #64748b') : '2px solid transparent',
              ...buttonStyle,
            }}
            key={lang.code}
          >
            {lang.label}
          </GradientButton>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
