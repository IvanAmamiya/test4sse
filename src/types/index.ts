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
    type?: "primary" | "default" | "dashed" | "link" | "text";
    style?: React.CSSProperties;
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}  

export type SSEHandler = (req: Request, res: Response) => SSEResponse;

// 只保留 TrainDataPoint 类型定义
export interface TrainDataPoint {
  step: number;
  loss: number;
  accuracy: number;
  totalSteps?: number;
  currentStep?: number;
}