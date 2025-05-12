import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      startTraining: '开始训练',
      confirm: '确定',
      cancel: '取消',
      trainingCurve: '训练曲线',
      lastTrainingCurve: '上一次训练曲线',
      confirmOperation: '确认操作',
      startTrainingQuestion: '开始训练，可以吗？',
      welcome: '欢迎使用 Ant Design 组件页面！',
      graphs: '曲线',
      progress: '进度',
      language: '语言',
      chinese: '中文',
      japanese: '日语',
      english: '英语',
      switchToLight: '切换到浅色',
      switchToDark: '切换到深色',
      progressAlert: '训练进度已自动刷新',
      lossCurve: '损失曲线',
      loss: '损失',
      accuracyCurve: '准确率曲线',
      accuracy: '准确率',
    }
  },
  ja: {
    translation: {
      startTraining: 'トレーニング開始',
      confirm: '確認',
      cancel: 'キャンセル',
      trainingCurve: 'トレーニング曲線',
      lastTrainingCurve: '前回のトレーニング曲線',
      confirmOperation: '操作の確認',
      startTrainingQuestion: 'トレーニングを開始しますか？',
      welcome: 'Ant Design コンポーネントページへようこそ！',
      graphs: 'グラフ',
      progress: '進捗',
      language: '言語',
      chinese: '中国語',
      japanese: '日本語',
      english: '英語',
      switchToLight: 'ライトモードに切り替え',
      switchToDark: 'ダークモードに切り替え',
      progressAlert: '進捗状況は自動で更新されます',
      lossCurve: '損失曲線',
      loss: '損失',
      accuracyCurve: '精度曲線',
      accuracy: '精度',
    }
  },
  en: {
    translation: {
      startTraining: 'Start Training',
      confirm: 'Confirm',
      cancel: 'Cancel',
      trainingCurve: 'Training Curve',
      lastTrainingCurve: 'Last Training Curve',
      confirmOperation: 'Confirm Operation',
      startTrainingQuestion: 'Start training, OK?',
      welcome: 'Welcome to the Ant Design component page!',
      graphs: 'Graphs',
      progress: 'Progress',
      language: 'Language',
      chinese: 'Chinese',
      japanese: 'Japanese',
      english: 'English',
      switchToLight: 'Switch to Light Mode',
      switchToDark: 'Switch to Dark Mode',
      progressAlert: 'Progress is auto-updated',
      lossCurve: 'Loss Curve',
      loss: 'Loss',
      accuracyCurve: 'Accuracy Curve',
      accuracy: 'Accuracy',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;