"use client";
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Typography, theme, message } from "antd";
import ThemeHeader from "@/components/ThemeHeader";
import TrainingPanel from "@/components/TrainingPanel";
import ProgressInfo from "@/components/ProgressInfo";
import GraphPanel from "@/components/GraphPanel";
import ConfirmTrainModal from "@/components/ConfirmTrainModal";
import useSSEProgress from "@/hooks/useSSEProgress";
import type { TrainDataPoint } from "@/types";
import { useTranslation } from "react-i18next";
import { trpc } from "@/utils/trpc";
import '../utils/i18n';

const { Content, Footer } = Layout;

const Page = () => {
  const [isDark, setIsDark] = useState(true);
  const [showGraphPanel, setShowGraphPanel] = useState(false);
  const [showConfirmTrain, setShowConfirmTrain] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [data, setData] = useState<TrainDataPoint[]>([]);
  const [progress, setProgress] = useState(0);
  const [queueEmpty, setQueueEmpty] = useState(false);
  
  // tRPC hooks
  const startTrainingMutation = trpc.train.start.useMutation();
  const stopTrainingMutation = trpc.train.stop.useMutation();
  const statusQuery = trpc.train.status.useQuery(undefined, {
    enabled: false, // 手动触发
  });
  const checkQueueQuery = trpc.train.checkQueueEmpty.useQuery(undefined, {
    enabled: false, // 手动触发
  });
  
  useSSEProgress(isTraining, setData, setProgress);
  const { t } = useTranslation();

  // 检查队列状态
  const checkQueueStatus = async () => {
    try {
      const result = await checkQueueQuery.refetch();
      if (result.data) {
        setQueueEmpty(result.data.isEmpty);
        if (result.data.isEmpty) {
          message.info(t('queue_empty') || 'Queue is empty. You can refresh to reload data.');
        }
      }
    } catch (error) {
      console.error('Failed to check queue status:', error);
      message.error(t('queue_check_failed') || 'Failed to check queue status');
    }
  };

  // 页面加载时检查队列状态
  useEffect(() => {
    checkQueueStatus();
  }, []);

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
    
    try {
      // 使用 tRPC mutation 启动训练
      const result = await startTrainingMutation.mutateAsync({
        epochs: 10,
        learningRate: 0.001,
        batchSize: 32,
      });
      
      if (result.success) {
        message.success(result.message || t('training_started') || 'Training started successfully');
      }
    } catch (error) {
      console.error('Failed to start training:', error);
      setIsTraining(false);
      message.error(t('training_start_failed') || 'Failed to start training');
    }
  };
  
  const handleConfirmTrainCancel = () => setShowConfirmTrain(false);

  // 停止训练
  const handleStopTraining = async () => {
    try {
      const result = await stopTrainingMutation.mutateAsync();
      
      if (result.success) {
        setIsTraining(false);
        message.success(result.message || t('training_stopped') || 'Training stopped successfully');
      }
    } catch (error) {
      console.error('Failed to stop training:', error);
      message.error(t('training_stop_failed') || 'Failed to stop training');
    }
  };

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
            onStop={handleStopTraining}
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
          {queueEmpty && (
            <div style={{ 
              textAlign: 'center', 
              margin: '16px 0', 
              padding: '16px',
              background: isDark ? '#2d3748' : '#f7fafc',
              borderRadius: '8px',
              border: `1px solid ${isDark ? '#4a5568' : '#e2e8f0'}`
            }}>
              <Typography.Text style={{ color: isDark ? "#E0E7FF" : "#000000" }}>
                {t('queue_empty_message') || 'Queue is empty. Click below to refresh and reload data.'}
              </Typography.Text>
              <br />
              <button 
                onClick={checkQueueStatus}
                style={{
                  marginTop: '8px',
                  padding: '8px 16px',
                  background: '#1677ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {t('refresh_queue') || 'Refresh Queue'}
              </button>
            </div>
          )}
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