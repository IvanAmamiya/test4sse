import React from "react";
import { Alert, Progress } from "antd";
import { getThemeGradient, getThemeColor } from "@/utils/theme";

interface ProgressInfoProps {
  isDark: boolean;
  progress: number;
}

const ProgressInfo: React.FC<ProgressInfoProps> = ({ isDark, progress }) => (
  <>
    <Alert
      message="Ant Design Alert Example"
      type="info"
      showIcon
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
      进度：{progress}%
    </div>
  </>
);

export default ProgressInfo;
