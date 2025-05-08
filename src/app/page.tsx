"use client";
import React, { useEffect, useState } from 'react';
import { Button, Input, Alert } from 'antd';

const Page = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      eventSource.close();
    };


  }, []);

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
    <div style={{ padding: 24 }}>
      <h1
        className="text-6xl text-center font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Server-Sent Events Example
      </h1>
      <div style={{ margin: '14px 0' }}>
        <Input placeholder="Type something..." style={{ width: 300, marginRight: 8 }} />
        <Button type="primary" onClick={handlePrmBtnClick}>AntD Button</Button>
      </div>
      <Alert message="Ant Design Alert Example" type="info" showIcon style={{ marginBottom: 16 }} />
      <div className='text-6xl text-left'>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Page;