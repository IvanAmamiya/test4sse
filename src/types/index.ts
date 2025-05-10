import gradients from "@/styles/gradients.json";
import colors from "@/styles/colors.json";

export type GradientKey = keyof typeof gradients;
export type ColorKey = keyof typeof colors;

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
}  

export type SSEHandler = (req: Request, res: Response) => SSEResponse;