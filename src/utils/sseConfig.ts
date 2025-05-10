export interface SSEHeaders {
  [key: string]: string;
}

export const SSE_HEADERS: SSEHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
};
