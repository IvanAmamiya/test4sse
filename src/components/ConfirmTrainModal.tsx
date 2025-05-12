import { Modal } from "antd";
import { getThemeColor } from "@/utils/theme";

// 只保留必要 props
interface ConfirmTrainModalProps {
  isDark: boolean;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmTrainModal: React.FC<ConfirmTrainModalProps & { t: any }> = ({ isDark, visible, onOk, onCancel, t }) => (
  <Modal
    title={t('confirmOperation')}
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={t('confirm')}
    cancelText={t('cancel')}
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
    {t('startTrainingQuestion')}
  </Modal>
);

export default ConfirmTrainModal;