import React from "react";
import { Modal } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TrainDataPoint } from "@/types";

interface GraphPanelProps {
  visible: boolean;
  onClose: () => void;
  data: TrainDataPoint[];
  t: (key: string) => string;
}

const GraphPanel: React.FC<GraphPanelProps> = ({ visible, onClose, data, t }) => {
  // loss 曲线：以 batch/step/global_batch 为横坐标，优先 global_batch > step > batch
  const lossData = data.filter(d => d.loss !== undefined || d.test_loss !== undefined).map(d => ({
    x: d.global_batch ?? d.step ?? d.batch ?? 0,
    loss: d.test_loss ?? d.loss,
  }));
  // accuracy 曲线：以 epoch 为横坐标，优先 test_acc > accuracy
  const accData = data.filter(d => (d.test_acc !== undefined || d.accuracy !== undefined) && d.epoch !== undefined && d.batch === undefined)
    .map(d => ({
      x: d.epoch ?? 0,
      accuracy: d.test_acc ?? d.accuracy,
    }));

  return (
    <Modal
      title={t('trainingCurve')}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>{t('loss')} {t('curve')}</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lossData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: t('batch'), position: 'insideBottomRight', offset: 0 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#8884d8" name={t('loss')} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>{t('accuracy')} {t('curve')}</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: t('epoch'), position: 'insideBottomRight', offset: 0 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" name={t('accuracy')} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Modal>
  );
};

export default GraphPanel;
