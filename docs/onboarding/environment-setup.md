# 開発環境構築ガイド

このドキュメントでは、StudyTrack の開発環境を一から構築する手順を説明します。

## 目次

- [必要な環境](#必要な環境)
- [Node.js のインストール](#nodejs-のインストール)
- [pnpm のインストール](#pnpm-のインストール)
- [Git のインストール](#git-のインストール)
- [リポジトリのセットアップ](#リポジトリのセットアップ)
- [開発サーバーの起動](#開発サーバーの起動)
- [よく使うコマンド](#よく使うコマンド)
- [トラブルシューティング](#トラブルシューティング)

## 必要な環境

StudyTrack の開発には以下の環境が必要です：

- **Node.js**: v18.17.0 以上（推奨: v20.x LTS）
- **パッケージマネージャー**: pnpm v8.x 以上（推奨）
- **Git**: v2.x 以上
- **エディタ**: Visual Studio Code（推奨）またはお好みのエディタ
- **OS**: Windows 10/11、macOS 10.15+、または Linux

## Node.js のインストール

### Windows

#### 方法1: 公式インストーラー（推奨）

1. [Node.js 公式サイト](https://nodejs.org/) にアクセス
2. **LTS版**（推奨）をダウンロード
3. ダウンロードした `.msi` ファイルを実行
4. インストールウィザードに従ってインストール
   - 「Automatically install the necessary tools」にチェックを入れる
5. インストール完了後、コマンドプロンプトまたは PowerShell を開いて確認：

```bash
node --version
# v20.x.x などが表示されれば成功
```

#### 方法2: winget（Windows 11 / Windows 10 最新版）

```bash
winget install OpenJS.NodeJS.LTS
```

### macOS

#### 方法1: 公式インストーラー

1. [Node.js 公式サイト](https://nodejs.org/) にアクセス
2. **LTS版**をダウンロード
3. ダウンロードした `.pkg` ファイルを実行
4. インストールウィザードに従ってインストール
5. ターミナルを開いて確認：

```bash
node --version
```

#### 方法2: Homebrew（推奨）

```bash
# Homebrew をインストール（未インストールの場合）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js をインストール
brew install node@20

# バージョン確認
node --version
```

### Linux (Ubuntu/Debian)

#### NodeSource リポジトリを使用（推奨）

```bash
# Node.js 20.x をインストール
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# バージョン確認
node --version
npm --version
```

#### nvm を使用（複数バージョン管理が必要な場合）

```bash
# nvm をインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# ターミナルを再起動または以下を実行
source ~/.bashrc

# Node.js 20.x をインストール
nvm install 20
nvm use 20

# バージョン確認
node --version
```

## pnpm のインストール

pnpm は高速で効率的なパッケージマネージャーです。StudyTrack では pnpm の使用を推奨しています。

### すべての OS（推奨方法）

Node.js がインストール済みの場合：

```bash
npm install -g pnpm
```

### Windows

PowerShell で以下を実行：

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

### macOS / Linux

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Homebrew (macOS)

```bash
brew install pnpm
```

### インストール確認

```bash
pnpm --version
# 8.x.x 以上が表示されれば成功
```

## Git のインストール

### Windows

#### 方法1: 公式インストーラー

1. [Git for Windows](https://git-scm.com/download/win) をダウンロード
2. インストーラーを実行
3. デフォルト設定のまま進めて問題ありません
4. インストール完了後、Git Bash またはコマンドプロンプトで確認：

```bash
git --version
```

#### 方法2: winget

```bash
winget install Git.Git
```

### macOS

Git は Xcode Command Line Tools に含まれています：

```bash
# Xcode Command Line Tools をインストール
xcode-select --install

# または Homebrew でインストール
brew install git
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install git
```

### Git の初期設定

```bash
# ユーザー名とメールアドレスを設定
git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# デフォルトブランチ名を設定
git config --global init.defaultBranch main
```

## リポジトリのセットアップ

### 1. リポジトリをクローン

```bash
# SSH を使用する場合（推奨）
git clone git@github.com:Takumi-Itaya/study-track.git

# または HTTPS を使用する場合
git clone https://github.com/Takumi-Itaya/study-track.git

# プロジェクトディレクトリに移動
cd study-track
```

### 2. フロントエンドの依存関係をインストール

```bash
# frontend ディレクトリに移動
cd frontend

# 依存関係をインストール
pnpm install
```

インストールには数分かかる場合があります。完了すると、`node_modules` ディレクトリが作成されます。

### 3. 環境変数の設定（必要に応じて）

現在のバージョンでは環境変数は不要ですが、将来的に API 連携などが追加された場合は `.env.local` ファイルを作成します：

```bash
# frontend ディレクトリで実行
cp .env.example .env.local  # .env.example がある場合
```

## 開発サーバーの起動

### フロントエンドサーバーの起動

```bash
# frontend ディレクトリで実行
pnpm dev
```

サーバーが起動すると、以下のようなメッセージが表示されます：

```
   ▲ Next.js 16.0.0
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、StudyTrack が表示されます。

### ホットリロード

開発サーバーが起動している間、ソースコードを編集すると自動的にブラウザに反映されます（ホットリロード）。

## よく使うコマンド

### 開発サーバー

```bash
# 開発サーバーを起動
pnpm dev

# 特定のポートで起動
pnpm dev --port 3001
```

### ビルド

```bash
# 本番用ビルドを作成
pnpm build

# ビルドしたアプリケーションを起動
pnpm start
```

### リンター

```bash
# リンターを実行
pnpm lint

# リンターを実行して自動修正
pnpm lint --fix
```

### 依存関係の管理

```bash
# 新しいパッケージをインストール
pnpm add <package-name>

# 開発用パッケージをインストール
pnpm add -D <package-name>

# パッケージをアンインストール
pnpm remove <package-name>

# 依存関係を更新
pnpm update

# 依存関係のバージョンを確認
pnpm list
```

### Git 操作

```bash
# ブランチを作成して切り替え
git checkout -b feature/your-feature-name

# 変更をステージング
git add .

# コミット
git commit -m "feat: 新機能を追加"

# リモートにプッシュ
git push origin feature/your-feature-name

# 最新の変更を取得
git pull origin main
```

## トラブルシューティング

### 1. `pnpm install` が失敗する

**症状**: 依存関係のインストール中にエラーが発生

**解決方法**:

```bash
# pnpm のキャッシュをクリア
pnpm store prune

# node_modules と lock ファイルを削除して再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 2. ポート 3000 が既に使用されている

**症状**: `Error: listen EADDRINUSE: address already in use :::3000`

**解決方法**:

```bash
# 別のポートで起動
pnpm dev --port 3001

# または、ポート 3000 を使用しているプロセスを終了（Windows）
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### 3. Node.js のバージョンが古い

**症状**: `Error: The engine "node" is incompatible with this module`

**解決方法**:

```bash
# Node.js のバージョンを確認
node --version

# v18.17.0 未満の場合は最新の LTS 版をインストール
```

### 4. モジュールが見つからない

**症状**: `Cannot find module 'xxx'`

**解決方法**:

```bash
# 依存関係を再インストール
pnpm install

# それでも解決しない場合
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 5. TypeScript のエラー

**症状**: 型エラーが多数表示される

**解決方法**:

```bash
# TypeScript サーバーを再起動（VS Code）
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# または、型定義を再生成
pnpm install
```

### 6. Git で SSH 接続できない

**症状**: `Permission denied (publickey)`

**解決方法**:

```bash
# SSH キーを生成（未作成の場合）
ssh-keygen -t ed25519 -C "your.email@example.com"

# SSH エージェントを起動
eval "$(ssh-agent -s)"

# SSH キーを追加
ssh-add ~/.ssh/id_ed25519

# 公開鍵を GitHub に登録
cat ~/.ssh/id_ed25519.pub
# 出力された内容を GitHub の Settings > SSH Keys に追加
```

### 7. Windows で pnpm が認識されない

**症状**: `'pnpm' is not recognized as an internal or external command`

**解決方法**:

```bash
# PowerShell を管理者権限で実行
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# pnpm を再インストール
npm install -g pnpm

# ターミナルを再起動
```

## 推奨される VS Code 拡張機能

開発を効率化するために、以下の拡張機能をインストールすることを推奨します：

1. **ESLint** - コードの品質チェック
2. **Prettier** - コードフォーマッター
3. **Tailwind CSS IntelliSense** - Tailwind のオートコンプリート
4. **TypeScript Vue Plugin (Volar)** - TypeScript サポート
5. **GitLens** - Git の拡張機能
6. **Auto Rename Tag** - HTML/JSX タグの自動リネーム
7. **Path Intellisense** - パスの自動補完

### インストール方法

1. VS Code を開く
2. 左サイドバーの拡張機能アイコンをクリック（または `Ctrl/Cmd + Shift + X`）
3. 上記の拡張機能名で検索してインストール

## 次のステップ

開発環境の構築が完了したら、以下のドキュメントも参照してください：

- **コーディング規約**: `docs/contributing/coding-standards.md`（作成予定）
- **Git ワークフロー**: `docs/contributing/git-workflow.md`（作成予定）
- **コンポーネント開発ガイド**: `docs/development/component-guide.md`（作成予定）

## サポート

問題が解決しない場合は、以下の方法でサポートを受けることができます：

- **GitHub Issues**: [問題を報告](https://github.com/Takumi-Itaya/study-track/issues)
- **Discussions**: [質問する](https://github.com/Takumi-Itaya/study-track/discussions)

---

最終更新: 2025-12-07
