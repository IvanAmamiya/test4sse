export async function GET(request: Request) {
  const encoder = new TextEncoder();
  let interval: NodeJS.Timeout;
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        // 推送消息并加上 padding 防止缓冲
        //data: (how many times) \n\n
        //: (padding) \n\n
        const data = `data: ${new Date().toISOString()}\n\n:${' '.repeat(2048)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };
      send();
      interval = setInterval(send, 4000); // 每10秒推送一次
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}