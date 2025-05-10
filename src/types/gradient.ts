export interface GradientButtonProps {
  className?: string;
  isDark?: boolean;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}
