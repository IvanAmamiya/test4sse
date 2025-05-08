"use client";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 border border-gray-400 shadow hover:scale-105 hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-200"
      onClick={toggleTheme}
    >
      切换{theme === "dark" ? "浅色" : "深色"}模式
    </button>
  );
}
