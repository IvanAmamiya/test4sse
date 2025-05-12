import React from "react";
import { Input } from "antd";
import GradientButton from "@/components/GradientButton";

interface TrainingPanelProps {
  isDark: boolean;
  onStart: () => void;
  onGraph: () => void;
  isTraining: boolean;
  t: (key: string) => string;
}

const TrainingPanel: React.FC<TrainingPanelProps> = ({ isDark, onStart, onGraph, isTraining, t }) => {
  return (
    <div style={{ margin: '14px 0' }}>
      <Input
        placeholder={t('inputPlaceholder')}
        className="transition-all duration-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        style={{ width: 300, marginRight: 8 }}
        disabled={isTraining}
      />
      <GradientButton isDark={isDark} onClick={onStart} disabled={isTraining}>
        {t('startTraining')}
      </GradientButton>
      <GradientButton isDark={isDark} onClick={onGraph}>
        {t('graphs')}
      </GradientButton>
    </div>
  );
};

export default TrainingPanel;
