import { Modal } from "antd";
import { getThemeColor } from "@/utils/theme";

interface ConfirmTrainModalProps {
  isDark: boolean;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  t: (key: string) => string;
}

const ConfirmTrainModal: React.FC<ConfirmTrainModalProps> = ({ isDark, visible, onOk, onCancel, t }) => (
  <Modal
    title={t('confirmOperation')}
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={t('confirm')}
    cancelText={t('cancel')}
    okButtonProps={{
      style: {
        background: getThemeColor(isDark ? 'modalOkBtnDark' : 'modalOkBtn', isDark),
        borderColor: getThemeColor(isDark ? 'modalOkBtnDark' : 'modalOkBtn', isDark),
        color: '#fff',
      },
    }}
    style={{
      backgroundColor: getThemeColor('modalBg', isDark),
      color: getThemeColor('text', isDark),
      border: `1px solid ${getThemeColor('modalBorder', isDark)}`,
    }}
  >
    {t('startTrainingQuestion')}
  </Modal>
);

export default ConfirmTrainModal;