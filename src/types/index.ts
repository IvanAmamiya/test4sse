import themeGradients from "@/styles/themeGradients.json";
import themeColors from "@/styles/themeColors.json";

export type ThemeGradientKey = keyof typeof themeGradients;
export type ThemeColorKey = keyof typeof themeColors;

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