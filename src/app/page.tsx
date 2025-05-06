"use client";
import React, { useEffect, useState } from 'react';

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
    <div>
      <h1 className='text-6xl text-center'>Server-Sent Events Example</h1>
      <div className='text-6xl text-left'>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Page;