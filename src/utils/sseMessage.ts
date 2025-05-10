// async generator: 负责消息管道/轮询/间隔等，route.ts 只需 for await...of 消费
export async function* getSSEMessageStream() {
  let count = 0;
  while (true) {
    count++;
    // mock: 每2秒产出一条消息，未来可替换为真实消息管道
    await new Promise(res => setTimeout(res, 2000));
    yield String(count);
  }
}
