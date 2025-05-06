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

  return (
    <div style={{ padding: 24 }}>
      <h1 className='text-6xl text-center'>Server-Sent Events Example</h1>
      <div style={{ margin: '16px 0' }}>
        <Input placeholder="Type something..." style={{ width: 300, marginRight: 8 }} />
        <Button type="primary">AntD Button</Button>
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