# 📚 Study Tracker

学習内容を記録・共有できる **学習記録アプリ** です。  
チーム開発を通して、フロントエンド（Next.js）とバックエンド（Spring Boot）の連携、  
Docker を用いた環境構築、AWS へのデプロイなどを学ぶことを目的としています。

---

## ✨ 機能

- ✅ 学習記録の作成・編集・削除
- 🏷 タグによる学習内容の分類
- 👥 チームメンバー間での学習記録共有
- 🔐 管理者によるユーザー管理機能
- 🕒 日別・週別の学習時間集計
- 📊 学習データの可視化（グラフ表示予定）

---

## 🧩 技術構成

### フロントエンド

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### バックエンド

- [Java](https://www.java.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)

### インフラ / 開発環境

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS (EC2 / RDS / S3)](https://aws.amazon.com/)
- [GitHub Actions](https://github.com/features/actions)（CI/CD）

---

## ⚙️ セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/Takumi-Itaya/study-tracker.git
cd study-tracker
```

### 2. Docker コンテナを起動

```bash
docker-compose up --build
```

初回は --build オプションを付けてイメージをビルドします。
2 回目以降は単に docker-compose up で OK です。

### 3. アクセス URL

サービス URL
フロントエンド http://localhost:3000
バックエンド http://localhost:8080
MySQL（コンテナ内） mysql://localhost:3306

※環境によってポート番号が異なる場合は .env または docker-compose.yml を参照してください。
