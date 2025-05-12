import React from "react";
import { Modal } from "antd";
import { getThemeColor } from "@/utils/theme";

interface CustomModalProps {
  isDark: boolean;
  visible: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isDark, visible, onClose, t }) => (
  <Modal
    title={t('customModalTitle')}
    open={visible}
    onCancel={onClose}
    footer={null}
    style={{
      backgroundColor: getThemeColor("modalBg", isDark),
      color: getThemeColor("text", isDark),
      border: `1px solid ${getThemeColor("modalBorder", isDark)}`,
    }}
  >
    {t('customModalContent')}
  </Modal>
);

export default CustomModal;
