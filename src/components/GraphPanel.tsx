import React from "react";
import { Modal } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TrainDataPoint } from "@/hooks/useSSEProgress";

interface GraphPanelProps {
  visible: boolean;
  onClose: () => void;
  data: TrainDataPoint[];
  t: (key: string) => string;
}

const GraphPanel: React.FC<GraphPanelProps> = ({ visible, onClose, data, t }) => (
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
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" label={{ value: t('step'), position: 'insideBottomRight', offset: 0 }} />
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
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" label={{ value: t('step'), position: 'insideBottomRight', offset: 0 }} />
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

export default GraphPanel;
