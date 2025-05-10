"use client";
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Typography, theme, Input, Alert, Progress, Modal, Button } from "antd";
import GradientButton from "@/components/GradientButton";
import { getGradient, getColor } from "@/utils/theme";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Page = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      const percent = Math.min(100, Math.max(0, parseInt(event.data, 10)));
      if (!isNaN(percent)) setProgress(percent);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // 确保 useEffect 只在客户端执行
  useEffect(() => {
    if (typeof window !== 'undefined' && window.document) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handlePrmBtnClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  }
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed:', e.currentTarget.value);
    }
  }
  const handleInputFocus = () => {
    console.log('Input focused');
  }
  const handleInputBlur = () => {
    console.log('Input blurred');
  }
  const handleInputClick = () => {
    console.log('Input clicked');
  }
  const handleInputContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('Right-click context menu opened');
  }
  const handleInputCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log('Text copied:', e.currentTarget.value);
  }
  const handleInputCut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log('Text cut:', e.currentTarget.value);
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1E3A8A",
          colorBgBase: isDark ? "#1E293B" : "#FFFFFF",
          colorTextBase: isDark ? "#E0E7FF" : "#000000",
        },
        // 移除 motion 配置，AntD v5 ConfigProvider 不支持 motion 作为 theme 属性
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: getGradient("header", isDark),
          }}
        >
          <Title
            level={2}
            style={{
              backgroundImage: getGradient("title", isDark),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Anon Saijo
          </Title>
          <GradientButton
            isDark={isDark} // 传入整体背景的 isDark 属性
            onClick={toggleTheme}
          >
            切换到{isDark ? "浅色" : "深色"}模式
          </GradientButton>
        </Header>
        <Content style={{ padding: "24px" }}>
          <Typography.Paragraph style={{ color: isDark ? "#E0E7FF" : "#000000" }}>
            欢迎使用 Ant Design 组件页面！
          </Typography.Paragraph>
          <div style={{ margin: '14px 0' }}>
            <Input
              placeholder="Type something..."
              className="transition-all duration-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              style={{ width: 300, marginRight: 8 }}
            />
            <GradientButton
              isDark={isDark} // 传入整体背景的 isDark 属性
              onClick={handlePrmBtnClick}
            >
              Start Training
            </GradientButton>
            <GradientButton
              isDark={isDark} // 传入整体背景的 isDark 属性
              onClick={handlePrmBtnClick}
            >
              Graphs
            </GradientButton>
          </div>
          <Alert
            message="Ant Design Alert Example"
            type="info"
            showIcon
            style={{
              marginBottom: 16,
              fontWeight: 'bold',
              fontSize: '1.25rem',
              background: getGradient("header", isDark),
              color: getColor("text", isDark),
              border: "none",
            }}
          />
          <Progress
            percent={progress}
            className="dark:bg-gray-800 dark:text-white"
            style={{ marginBottom: 16 }}
          />
          <div className="text-2xl text-left" style={{ color: getColor("progressText", isDark) }}>
            进度：{progress}%
          </div>
          <Modal
            title="AntD Button Clicked!"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            style={{
              backgroundColor: getColor("modalBg", isDark),
              color: getColor("text", isDark),
              border: `1px solid ${getColor("modalBorder", isDark)}`,
            }}
          >
            这是一个示例对话框，内容会根据主题动态调整颜色。
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center", color: getColor("text", isDark) }}>
          Anon Saijo
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;