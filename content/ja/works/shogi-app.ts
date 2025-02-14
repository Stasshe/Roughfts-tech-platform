import { WorkContent } from "../../../types/content";

export const shogiAppJa: WorkContent = {
  id: 'shogi-app',
  title: '将棋アプリ - CeConV2.31',
  description: 'iPadに最適化された現代的な将棋アプリケーション。AI対戦とマルチプレイヤー機能を搭載。',
  techStack: [
    'Swift',
    'SpriteKit',
    'Firebase',
    'WebSocket',
    'AI統合'
  ],
  features: [
    {
      title: 'ゲーム機能',
      details: [
        'リアルタイムマルチプレイヤー対戦',
        '難易度調整可能なAI対戦',
        '駒の動きを検証する対話型将棋盤',
        '棋譜再生と対局履歴機能',
        '伝統的な日本の将棋駒デザイン'
      ]
    },
    {
      title: '技術的特徴',
      details: [
        '将棋表記法のカスタムパーサー',
        'リアルタイムゲーム状態同期',
        'プレイヤー間のチャットシステム',
        'プロフィール管理システム',
        'ゲーム状態の永続化'
      ]
    },
    {
      title: 'ユーザー体験',
      details: [
        '直感的なドラッグ＆ドロップ操作',
        '視覚的な手の提案',
        'ゲーム内チャット機能',
        'カスタマイズ可能なゲーム設定',
        'iPadに最適化されたパフォーマンス'
      ]
    }
  ],
  images: [
    '/assets/cecon/IMG_0342.png',
    '/assets/cecon/IMG_0339.png',
    '/assets/cecon/IMG_0345.png',
    '/assets/cecon/IMG_0346.png'
  ],
  demoVideo: '/assets/cecon/ScreenRecording_02-14-2025 09-49-30_1.mp4'
}; 