import { WorkContent } from "../../../types/content";

export const shogiAppJa: WorkContent = {
  id: 'shogi-app',
  title: '将棋アプリ - CeConV2.31',
  description: '一つでオンライン・研究ができる唯一無二の将棋アプリケーション。AI対戦を搭載し、Playgroundsでも遊べる。',
  techStack: [
    'Swift',
    'SpriteKit',
    'Firebase',
    'WebSocket',
    'AI'
  ],
  features: [
    {
      title: 'ゲーム機能',
      details: [
        'オンライン対戦',
        'AI対戦',
        '駒の動きを検証する対話型将棋盤',
        '棋譜再生と対局履歴機能',
        '棋譜保存・読み込み',
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
        '直感的かつスピーディーな操作が可能',
        '移動できるマスの強調表示',
        'ゲーム内チャット機能',
        '対戦中はプライベートチャットに自動移行',
        'iPadのPlaygroundsで動かせる'
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