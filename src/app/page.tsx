"use client";
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Typography, theme } from "antd";
import ThemeHeader from "@/components/ThemeHeader";
import TrainingPanel from "@/components/TrainingPanel";
import ProgressInfo from "@/components/ProgressInfo";
import GraphPanel from "@/components/GraphPanel";
import ConfirmTrainModal from "@/components/ConfirmTrainModal";
import { useSSEProgress } from "@/hooks/useSSEProgress";
import type { TrainDataPoint } from "@/hooks/useSSEProgress";
import { useTranslation } from "react-i18next";
import '../utils/i18n';

const { Content, Footer } = Layout;

const Page = () => {
  const [isDark, setIsDark] = useState(true);
  const [showGraphPanel, setShowGraphPanel] = useState(false);
  const [showConfirmTrain, setShowConfirmTrain] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [data, setData] = useState<TrainDataPoint[]>([]);
  const [progress, setProgress] = useState(0);
  useSSEProgress(isTraining, setData, setProgress);
  const { t } = useTranslation();

  // 训练锁定逻辑仅依赖进度
  const percent = progress;
  const isTrainingLocked = percent > 0 && percent < 100;

  const toggleTheme = () => setIsDark(!isDark);
  const handlePrmBtnClick = () => setShowConfirmTrain(true);
  const handleGraphClick = () => setShowGraphPanel(true);
  const handleGraphClose = () => setShowGraphPanel(false);
  const handleConfirmTrainOk = async () => {
    setShowConfirmTrain(false);
    setIsTraining(true); // 直接进入训练状态
    setData([]); // 清空当前曲线
    setProgress(0);
    // 请求后端启动训练
    const res = await fetch('/api/train/start', { method: 'POST' });
    if (!res.ok) {
      setIsTraining(false);
      const result = await res.json();
      // 可选：弹窗提示 result.msg
    }
  };
  const handleConfirmTrainCancel = () => setShowConfirmTrain(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1E3A8A",
          colorBgBase: isDark ? "#1E293B" : "#FFFFFF",
          colorTextBase: isDark ? "#E0E7FF" : "#000000",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <ThemeHeader isDark={isDark} onToggleTheme={toggleTheme} t={t} />
        <Content style={{ padding: "24px" }}>
          <Typography.Paragraph style={{ color: isDark ? "#E0E7FF" : "#000000" }}>
            {t('welcome')}
          </Typography.Paragraph>
          <TrainingPanel
            isDark={isDark}
            onStart={handlePrmBtnClick}
            onGraph={handleGraphClick}
            isTraining={isTrainingLocked || showConfirmTrain}
            t={t}
          />
          <ConfirmTrainModal
            isDark={isDark}
            visible={showConfirmTrain}
            onOk={handleConfirmTrainOk}
            onCancel={handleConfirmTrainCancel}
            t={t}
          />
          <ProgressInfo isDark={isDark} progress={percent} t={t} />
          <GraphPanel visible={showGraphPanel} onClose={handleGraphClose} data={data} t={t} />
        </Content>
        <Footer style={{ textAlign: "center", color: isDark ? "#E0E7FF" : "#000000" }}>
          Anon Saijo
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;