# Study Track

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?logo=amazonaws&logoColor=white)

学習記録を管理・共有するためのモダンな Web アプリケーションです。学習内容を記録し、タグやカテゴリーで整理して、他の人と共有できます。

## 主な機能

- 📝 **学習記録の作成・管理**: 学習内容、時間、詳細なメモを記録
- 📄 **マークダウン対応**: マークダウン形式でメモを作成し、リアルタイムでプレビュー
- 🏷️ **スマートな整理**: カテゴリーやタグで学習記録を分類
- 🔍 **検索・フィルタリング**: タイトル検索やタグでのフィルタリングが可能
- ❤️ **ソーシャル機能**: いいねやコメントで学習記録を共有
- 🌙 **ダークモード**: 目に優しいダークモード完全対応
- 📱 **レスポンシブデザイン**: デスクトップ・モバイルで快適に利用可能

## 技術スタック

### フロントエンド

- **Next.js 16.0** - App Router を使用した React フレームワーク
- **React 19.2** - UI ライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS v4** - ユーティリティファースト CSS フレームワーク
- **shadcn/ui** - Radix UI ベースの美しい UI コンポーネント
- **React Markdown** - シンタックスハイライト付きマークダウンレンダリング
- **React Hook Form + Zod** - フォームバリデーション
- **Recharts** - データビジュアライゼーション
- **next-themes** - ダークモード対応

### バックエンド

- **Spring Boot 3.x** - Web フレームワーク
- **Java 17+**
- **Spring Security 6** - セキュリティ
- **Auth0 Java JWT** - JWT トークンの生成
- **PostgreSQL** - データベース
- **Gradle** -ビルドツール

## セットアップ

### 必要な環境

- Node.js 18.x 以上
- pnpm（推奨）または npm

### インストール手順

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/study-track.git
cd study-track
```

2. 依存関係をインストール

```bash
cd frontend
pnpm install
```

3. 開発サーバーを起動

```bash
pnpm dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### 本番ビルド

```bash
pnpm build
pnpm start
```

## プロジェクト構成

```
study-track/
├── frontend/           # Next.jsフロントエンドアプリケーション
│   ├── app/           # App Routerページ
│   │   ├── page.tsx           # ホーム（記録一覧）
│   │   ├── create/            # 記録作成ページ
│   │   ├── edit/[id]/         # 記録編集ページ
│   │   ├── study/[id]/        # 記録詳細ページ
│   │   └── profile/           # プロフィールページ
│   ├── components/    # Reactコンポーネント
│   │   ├── ui/                # shadcn/ui コンポーネント
│   │   ├── study-record-list.tsx  # 記録一覧コンポーネント
│   │   ├── login-dialog.tsx       # ログインダイアログ
│   │   └── footer.tsx             # フッター
│   ├── lib/           # ユーティリティ関数とコンテキスト
│   │   ├── auth-context.tsx      # 認証コンテキスト
│   │   └── utils.ts              # ユーティリティ関数
│   └── public/        # 静的アセット
│
├── backend/           # バックエンドAPI
│   ├── src/
│   │   ├ main/
│   │   │  ├ java/
│   │   │  │   └ com/studytrack/api/
│   │   │  │     ├ StudyTrackApplication.java   # メインクラス
│   │   │  │     ├ config/       # 設定（Security, CORS, Swagger など）
│   │   │  │     ├ controller/   # 入出力層（API）
│   │   │  │     ├ service/      # ビジネスロジック層
│   │   │  │     ├ repository/   # DB アクセス層（JPA, MyBatis）
│   │   │  │     ├ domain/       # ドメインモデル（Entity / ValueObject）
│   │   │  │     ├ dto/          # Request / Response DTO
│   │   │  │     ├ mapper/       # DTO ↔ Entity 変換
│   │   │  │     ├ exception/    # エラークラス & グローバル例外ハンドラ
│   │   │  │     └ util/         # 汎用ユーティリティ
│   │   │  └ resources/
│   │   │    ├ application.properties           # 設定ファイル
│   │   │    ├ static/                          # 静的ファイル（Web用）
│   │   │    └ templates/                       # Thymeleaf等のテンプレ
│   │   │
│   │   └ test/     #テスト
│   ├ build.gradle
│   ├ gradlew / gradlew.bat
│   └ gradle/
│
├──docs/   #ドキュメント
│   ├── architecture/     # システム全体の構造
│   │   ├── system-overview.md     # システム概要
│   │   ├── architecture-diagram.md # アーキテクチャ図（Next.js + Spring Boot）
│   │   └── directory-structure.md  # プロジェクト構成の説明
│   ├── requirements/     # 要件・仕様
│   │   ├── feature-list.md        # 必要な機能一覧
│   │   ├── user-stories.md        # ユーザーストーリー
│   │   └── non-functional.md      # 非機能要件（性能・保守性）
│   ├── design/           # 設計資料（フロント・バック共通）
│   │   ├── screen-design/         # 画面設計
│   │   │   ├── screen-flow.md     # 画面遷移図
│   │   │   └── ui-wireframes.md   # ワイヤーフレーム
│   │   ├── api-design/            # API設計
│   │   │   └── api.md       # API仕様一覧
│   │   ├── db-design/             # DB設計
│   │   │   └── db-design.md          # ER図とスキーマ設計
│   │   └── sequence/              # 処理フロー
│   │       └── sequence-diagrams.md
│   ├── operations/       # 開発運用関連
│   │   ├── coding-guidelines.md   # コーディング規約（TS/Java）
│   │   ├── api-guidelines.md      # API命名・方針
│   │   ├── branch-strategy.md     # Gitブランチ戦略
│   │   ├── pr-template.md         # PRテンプレート記録
│   │   └── development-flow.md    # 開発フロー（Issue→Branch→PR の流れ）
│   ├── notes/            # その他メモ・議事録
│   │   └── meeting-notes.md
└───└── onboarding/       # 学習資料
```

## 使い方

### 学習記録の作成

1. ログインボタンをクリック（現在はモックデータを使用）
2. 「新しい記録を追加」ボタンをクリック
3. 以下の項目を入力：
   - **学習内容**: 今日学習した内容のタイトル
   - **学習時間**: 学習にかかった時間（分単位）
   - **カテゴリー**: プログラミング、語学、数学、理科、資格、その他から選択
   - **メモ**: マークダウン形式で詳細な学習内容を記録
4. 「記録を保存」ボタンをクリック

### マークダウンの使い方

メモ欄では以下のマークダウン記法が使用できます：

```markdown
# 見出し 1

## 見出し 2

**太字**
_斜体_

- リスト項目 1
- リスト項目 2

`インラインコード`

\`\`\`javascript
// コードブロック
const example = "Hello World";
\`\`\`
```

### 記録の検索とフィルタリング

- 検索バーにキーワードを入力してタイトルで検索
- タグボタンをクリックして特定のタグの記録のみを表示
- 「すべて」ボタンでフィルターをリセット

## 開発状況

🚧 **現在のステータス**: 初期開発段階

### 実装済み

- ✅ フロントエンド UI 実装
- ✅ 学習記録の作成・表示
- ✅ マークダウン対応とプレビュー機能
- ✅ 検索・フィルタリング機能
- ✅ レスポンシブデザイン
- ✅ ダークモード

### 開発予定

- ⏳ バックエンド API
- ⏳ ユーザー認証機能
- ⏳ データベース連携
- ⏳ 実際のソーシャル機能（いいね・コメント）
- ⏳ 学習統計・グラフ表示
- ⏳ 学習目標設定機能

現在はデモンストレーション用のサンプルデータを使用しています。バックエンド統合は今後のリリースで予定しています。

## 利用可能なスクリプト

```bash
# 開発サーバーの起動
pnpm dev

# 本番用ビルド
pnpm build

# 本番サーバーの起動
pnpm start

# リンター実行
pnpm lint
```

## コントリビューション

プルリクエストを歓迎します！以下の手順で貢献できます：

1. プロジェクトをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m '素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 謝辞

- [Next.js](https://nextjs.org/) で構築
- UI コンポーネントは [shadcn/ui](https://ui.shadcn.com/) を使用
- アイコンは [Lucide](https://lucide.dev/) を使用

---

すべての学習者のために ❤️ を込めて作成
