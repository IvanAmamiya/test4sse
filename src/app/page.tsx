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
import '../utils/i18n';

const { Content, Footer } = Layout;

const Page = () => {
  const [isDark, setIsDark] = useState(true);
  const [showGraphPanel, setShowGraphPanel] = useState(false);
  const [showConfirmTrain, setShowConfirmTrain] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [prevData, setPrevData] = useState<TrainDataPoint[]>([]);
  const { data, progress } = useSSEProgress(isTraining);

  useEffect(() => {
    // 页面加载时获取训练状态和进度
    fetch('/api/train/status')
      .then(res => res.json())
      .then(res => {
        setIsTraining(res.running || res.lock); // 只要后端有 lock 或 running，按钮都禁用
        setPrevData(res.progress || []);
      });
  }, []);

  const toggleTheme = () => setIsDark(!isDark);
  const handlePrmBtnClick = () => setShowConfirmTrain(true);
  const handleGraphClick = () => setShowGraphPanel(true);
  const handleGraphClose = () => setShowGraphPanel(false);
  const handleConfirmTrainOk = async () => {
    setShowConfirmTrain(false);
    setPrevData(data); // 保存上一次训练的进度
    setIsTraining(false); // 先重置训练状态，防止进度条残留
    setTimeout(() => {
      setIsTraining(true); // 重新进入训练状态
    }, 0);
    setTimeout(() => {
      setPrevData([]); // 清空上一次训练进度
    }, 0);
    // 请求后端启动训练
    const res = await fetch('/api/train/start', { method: 'POST' });
    if (!res.ok) {
      setIsTraining(false);
      const result = await res.json();
      if (result.msg === 'Training already in progress') {
        fetch('/api/train/status')
          .then(r => r.json())
          .then(status => {
            if (!status.running && !status.lock) {
              setIsTraining(false);
            }
          });
      }
    }
  };
  const handleConfirmTrainCancel = () => setShowConfirmTrain(false);

  const percent = data.length > 0 && data[data.length - 1].totalSteps
    ? Math.round((data[data.length - 1].currentStep! / data[data.length - 1].totalSteps!) * 100)
    : 0;
  const isTrainingLocked = percent > 0 && percent < 100;

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
        <ThemeHeader isDark={isDark} onToggleTheme={toggleTheme} />
        <Content style={{ padding: "24px" }}>
          <Typography.Paragraph style={{ color: isDark ? "#E0E7FF" : "#000000" }}>
            欢迎使用 Ant Design 组件页面！
          </Typography.Paragraph>
          <TrainingPanel
            isDark={isDark}
            onStart={handlePrmBtnClick}
            onGraph={handleGraphClick}
            isTraining={isTrainingLocked || showConfirmTrain}
          />
          {/* 显示上一次训练进度 */}
          {prevData.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Typography.Title level={5} style={{ color: isDark ? "#E0E7FF" : "#000000" }}>上一次训练曲线</Typography.Title>
              <GraphPanel visible={false} onClose={() => {}} data={prevData} />
            </div>
          )}
          <ConfirmTrainModal
            isDark={isDark}
            visible={showConfirmTrain}
            onOk={handleConfirmTrainOk}
            onCancel={handleConfirmTrainCancel}
          />
          <ProgressInfo isDark={isDark} progress={percent} />
          <GraphPanel visible={showGraphPanel} onClose={handleGraphClose} data={data} />
        </Content>
        <Footer style={{ textAlign: "center", color: isDark ? "#E0E7FF" : "#000000" }}>
          Anon Saijo
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;