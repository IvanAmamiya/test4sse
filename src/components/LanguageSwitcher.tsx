import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  style?: React.CSSProperties;
}

const langs = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { i18n } = useTranslation();
  const current = i18n.language;
  return (
    <div style={{ display: "flex", gap: 8, ...style }}>
      {langs.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: current === lang.code ? "2px solid #1E3A8A" : "1px solid #ccc",
            background: current === lang.code ? "#1E3A8A" : "#fff",
            color: current === lang.code ? "#fff" : "#222",
            fontWeight: current === lang.code ? 700 : 400,
            cursor: "pointer",
            outline: "none",
            transition: "all 0.2s"
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
