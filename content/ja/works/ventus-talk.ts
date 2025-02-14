import { WorkContent } from "../../../types/content";

export const ventusTalkJa: WorkContent = {
  id: 'ventus-talk',
  title: 'Ventus-Talk',
  description: '1日10,000以上のメッセージを処理するリアルタイム同期機能を備えた高性能チャットアプリケーション。',
  techStack: [
    'Firestore',
    'JavaScript',
    'PWA',
    'FCM (Firebase Cloud Messaging)',
    'Google Drive API',
    'WebRTC',
    'Service Workers'
  ],
  features: [
    {
      title: '主要機能',
      details: [
        '0.05-0.15秒の更新速度を実現するリアルタイムメッセージング',
        '3台のFirestoreサーバーによるマルチサーバーアーキテクチャ',
        '効率的な4MB静的サイトデプロイメント',
        'YouTubeリンクの自動変換と埋め込み',
        'QRコードによる友達追加システム',
        'ファイル共有サポート',
        'Service Workersによるプッシュ通知'
      ]
    },
    {
      title: 'ユーザーエクスペリエンス',
      details: [
        '15種類のカスタマイズ可能なフォント',
        '5つのテーマカラーオプション',
        'すべてのデバイスに対応したレスポンシブデザイン',
        'オフラインメッセージのキャッシング',
        '既読ステータス表示',
        'メッセージ検索機能',
        'あらゆる種類の文字に対応'
      ]
    },
    {
      title: '技術的成果',
      details: [
        '1日10,000以上のメッセージ処理',
        'ロードバランスされたデータベースアーキテクチャ',
        '最適化された画像圧縮',
        'セキュアなパスワードハッシュ化',
        'リアルタイムプレゼンス検出',
        '効率的なデータ同期',
        'クロスプラットフォーム互換性'
      ]
    }
  ],
  images: [
    '/assets/ventus-talk/IMG_0226.png',
    '/assets/ventus-talk/IMG_0153.png',
    '/assets/ventus-talk/IMG_0230.png',
    '/assets/ventus-talk/IMG_0146.png',
    '/assets/ventus-talk/IMG_0232.png'
  ],
  highlights: [
    {
      title: 'パフォーマンス',
      value: '0.05秒',
      description: 'メッセージ更新速度'
    },
    {
      title: '規模',
      value: '1万+',
      description: '1日あたりのメッセージ数'
    },
    {
      title: 'サイズ',
      value: '4MB',
      description: '静的デプロイメント'
    }
  ],
  architecture: {
    diagram: '/assets/ventus-talk/architecture.svg',
    description: '最適なパフォーマンスとスケーラビリティを実現するFirebase Firestoreを活用したマルチサーバーアーキテクチャ。'
  },
  demoVideo: '/assets/ventus-talk/demo.mp4'
}; 