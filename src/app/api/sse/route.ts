import { getSSEMessageStream } from "@/utils/sseMessage";
import { SSE_HEADERS } from "@/utils/sseConfig";

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const msg of getSSEMessageStream()) {
          const data = `data: ${msg}\n\n:${' '.repeat(2048)}\n\n`;
          controller.enqueue(encoder.encode(data));
        }
      } catch (e) {
        controller.error(e);
      }
    },
    cancel() {
      // 可选：如有清理逻辑可在此处理
    },
  });

  return new Response(stream, {
    headers: SSE_HEADERS,
  });
}