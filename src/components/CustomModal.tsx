import React from "react";
import { Modal } from "antd";
import { getThemeColor } from "@/utils/theme";

interface CustomModalProps {
  isDark: boolean;
  visible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isDark, visible, onClose }) => (
  <Modal
    title="AntD Button Clicked!"
    open={visible}
    onCancel={onClose}
    footer={null}
    style={{
      backgroundColor: getThemeColor("modalBg", isDark),
      color: getThemeColor("text", isDark),
      border: `1px solid ${getThemeColor("modalBorder", isDark)}`,
    }}
  >
    这是一个示例对话框，内容会根据主题动态调整颜色。
  </Modal>
);

export default CustomModal;
