// async generator: 负责消息管道/轮询/间隔等，route.ts 只需 for await...of 消费
export async function* getSSEMessageStream() {
  let step = 0;
  let loss = 1;
  let accuracy = 0;
  while (step < 20) {
    step++;
    // mock 递减 loss，递增 accuracy
    loss = Math.max(0.05, loss * 0.8 + Math.random() * 0.05);
    accuracy = Math.min(1, accuracy + 0.05 + Math.random() * 0.05);
    const data = { step, loss: Number(loss.toFixed(3)), accuracy: Number(accuracy.toFixed(3)) };
    await new Promise(res => setTimeout(res, 1000));
    console.log('[SSE mock]', data);
    yield JSON.stringify(data);
  }
}
