"use client";
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Button, Typography, theme, Input, Alert, Progress, Modal } from "antd";

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
        motion: {
          motionDurationMid: "0.5s", // 将过渡持续时间延长到 0.5s
          motionEaseInOut: "ease-in-out", // 保持缓动函数
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: isDark
              ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
              : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
          }}
        >
          <Title
            level={2}
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, #93C5FD, #BFDBFE)" // 深色模式下的文字渐变
                : "linear-gradient(to right, #8B5CF6, #D946EF)", // 浅色模式下的文字渐变
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Anon Saijo
          </Title>
          <Button
            type="primary"
            style={{
              background: isDark
                ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
                : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
              color: isDark ? "#E0E7FF" : "#000000",
              border: "none",
            }}
            onClick={toggleTheme}
          >
            切换到{isDark ? "浅色" : "深色"}模式
          </Button>
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
            <Button
              type="primary"
              className="transition-all duration-300"
              style={{
                background: isDark
                  ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
                  : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
                color: isDark ? "#E0E7FF" : "#000000",
                border: "none",
              }}
              onClick={handlePrmBtnClick}
            >
              AntD Button
            </Button>
          </div>
          <Alert
            message="Ant Design Alert Example"
            type="info"
            showIcon
            style={{
              marginBottom: 16,
              fontWeight: 'bold',
              fontSize: '1.25rem',
              background: isDark
                ? "linear-gradient(to right, #1E3A8A, #334155)" // 深色模式下的渐变
                : "linear-gradient(to right, #FFFFFF, #F3F4F6)", // 浅色模式下的渐变
              color: isDark ? "#E0E7FF" : "#000000",
              border: "none",
            }}
          />
          <Progress
            percent={progress}
            className="dark:bg-gray-800 dark:text-white"
            style={{ marginBottom: 16 }}
          />
          <div className="text-2xl text-left" style={{ color: isDark ? '#93c5fd' : '#1e3a8a' }}>
            进度：{progress}%
          </div>
          <Modal
            title="AntD Button Clicked!"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            style={{
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
              color: isDark ? "#E0E7FF" : "#000000",
              border: `1px solid ${isDark ? '#334155' : '#D9D9D9'}`,
            }}
          >
            这是一个示例对话框，内容会根据主题动态调整颜色。
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center", color: isDark ? "#E0E7FF" : "#000000" }}>
          Anon Saijo
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;