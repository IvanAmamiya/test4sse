import { Modal } from "antd";
import { getThemeColor } from "@/utils/theme";

// 只保留必要 props
interface ConfirmTrainModalProps {
  isDark: boolean;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmTrainModal: React.FC<ConfirmTrainModalProps> = ({ isDark, visible, onOk, onCancel }) => (
  <Modal
    title="确认操作"
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText="确定"
    cancelText="取消"
    okButtonProps={{
      style: {
        background: isDark ? "#f59e42" : "#22c55e",
        borderColor: isDark ? "#f59e42" : "#22c55e",
        color: "#fff",
      },
    }}
    style={{
      backgroundColor: getThemeColor("modalBg", isDark),
      color: getThemeColor("text", isDark),
      border: `1px solid ${getThemeColor("modalBorder", isDark)}`,
    }}
  >
    开始训练，可以吗？
  </Modal>
);

export default ConfirmTrainModal;