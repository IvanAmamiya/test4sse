import React from "react";
import { Input } from "antd";
import GradientButton from "@/components/GradientButton";

interface TrainingPanelProps {
  isDark: boolean;
  onStart: () => void;
  onGraph: () => void;
  isTraining: boolean;
}

const TrainingPanel: React.FC<TrainingPanelProps> = ({ isDark, onStart, onGraph, isTraining }) => {
  return (
    <div style={{ margin: '14px 0' }}>
      <Input
        placeholder="Type something..."
        className="transition-all duration-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        style={{ width: 300, marginRight: 8 }}
        disabled={isTraining}
      />
      <GradientButton isDark={isDark} onClick={onStart} disabled={isTraining}>
        Start Training
      </GradientButton>
      <GradientButton isDark={isDark} onClick={onGraph}>
        Graphs
      </GradientButton>
    </div>
  );
};

export default TrainingPanel;
