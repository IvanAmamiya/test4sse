"use client";
import React, { useEffect, useState } from 'react';
import { Button, Input, Alert, Progress } from 'antd';

const Page = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);

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

  const handlePrmBtnClick = () => {
    alert('AntD Button Clicked!');
  }
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
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900" style={{ padding: 24 }}>
      <h1
        className="text-6xl text-center font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          height: '90px',
          backgroundImage: 'linear-gradient(to right, #3b82f6, #a855f7, #ec4899)',
        }}
      >
        Server-Sent Events Example
      </h1>
      <div style={{ margin: '14px 0' }}>
        <Input
          placeholder="Type something..."
          className="dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          style={{ width: 300, marginRight: 8 }}
        />
        <Button
          type="primary"
          className="dark:bg-blue-800 dark:border-blue-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          onClick={handlePrmBtnClick}
        >
          AntD Button
        </Button>
      </div>
      <Alert
        message="Ant Design Alert Example"
        type="info"
        showIcon
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
        style={{ marginBottom: 16, fontWeight: 'bold', fontSize: '1.25rem', backgroundColor: '#1E293B', color: '#E0E7FF' }}
      />
      <Progress
        percent={progress}
        className="dark:bg-gray-800 dark:text-white"
        style={{ marginBottom: 16 }}
      />
      <div className="text-2xl text-left" style={{ color: isDark ? '#93c5fd' : '#1e3a8a' }}>
        进度：{progress}%
      </div>
    </div>
  );
};

export default Page;