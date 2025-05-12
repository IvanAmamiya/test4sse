"use client";
import React, { useState } from 'react';
import { ConfigProvider, Layout, Typography, theme } from "antd";
import ThemeHeader from "@/components/ThemeHeader";
import TrainingPanel from "@/components/TrainingPanel";
import ProgressInfo from "@/components/ProgressInfo";
import CustomModal from "@/components/CustomModal";
import GraphPanel from "@/components/GraphPanel";
import { useSSEProgress } from "@/hooks/useSSEProgress";

const { Content, Footer } = Layout;

const Page = () => {
  const [isDark, setIsDark] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showGraphPanel, setShowGraphPanel] = useState(false);
  const { data, progress } = useSSEProgress();

  const toggleTheme = () => setIsDark(!isDark);
  const handlePrmBtnClick = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);
  const handleGraphClick = () => setShowGraphPanel(true);
  const handleGraphClose = () => setShowGraphPanel(false);

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
          <TrainingPanel isDark={isDark} onStart={handlePrmBtnClick} onGraph={handleGraphClick} />
          <ProgressInfo isDark={isDark} progress={progress} />
          <CustomModal isDark={isDark} visible={isModalVisible} onClose={handleModalClose} />
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