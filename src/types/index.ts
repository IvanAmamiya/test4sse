// 主题色与渐变类型定义，配合 themeColors/themeGradients 使用
import themeConfig from "@/styles/themeConfig.json";

export type ThemeGradientKey = keyof typeof themeConfig.gradients;
export type ThemeColorKey = keyof typeof themeConfig.colors;

export interface SSEEvent {
    id?: string;
    event?: string;
    data: string;
}

export interface SSEResponse {
    stream: ReadableStream<SSEEvent>;
}

export interface GradientButtonProps {
    className?: string;
    isDark?: boolean;
    key?: string;
    type?: "primary" | "default" | "dashed" | "link" | "text";
    style?: React.CSSProperties;
    onClick: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}  

export type SSEHandler = (req: Request, res: Response) => SSEResponse;

// 只保留 TrainDataPoint 类型定义
export interface TrainDataPoint {
  // 横坐标：batch/step/global_batch/epoch
  step?: number; // 通用横坐标（batch 或 global_batch 或 step）
  epoch?: number;
  batch?: number;
  global_batch?: number;

  // 损失与准确率
  loss?: number; // 训练损失
  accuracy?: number; // 训练准确率
  test_loss?: number; // 测试损失
  test_acc?: number; // 测试准确率

  // 总步数/批次
  totalSteps?: number;
  currentStep?: number;
  total_batches?: number;
  total_batches_all?: number;

  // 进度百分比
  progress?: number;
}