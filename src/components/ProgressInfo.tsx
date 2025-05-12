import React from "react";
import { Alert, Progress } from "antd";
import { getThemeGradient, getThemeColor } from "@/utils/theme";
import styles from "../styles/pageStyles.module.css";

interface ProgressInfoProps {
  isDark: boolean;
  progress: number;
  t: (key: string) => string;
}

const ProgressInfo: React.FC<ProgressInfoProps> = ({ isDark, progress, t }) => (
  <>
    <Alert
      message={t('progressAlert')}
      type="info"
      showIcon
      className={styles.themeTransition}
      style={{
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: '1.25rem',
        background: getThemeGradient("header", isDark),
        color: getThemeColor("text", isDark),
        border: "none",
      }}
    />
    <Progress
      percent={progress}
      className="dark:bg-gray-800 dark:text-white"
      style={{ marginBottom: 16 }}
    />
    <div className="text-2xl text-left" style={{ color: getThemeColor("progressText", isDark) }}>
      {t('progress')}: {progress}%
    </div>
  </>
);

export default ProgressInfo;
