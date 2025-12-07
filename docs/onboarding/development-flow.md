# 🚀 StudyTrack Onboarding Guide

**ようこそ StudyTrack 開発チームへ！**

このガイドは、開発未経験〜初心者でも迷わず開発に参加できるように作られています。  
Git、GitHub、ブランチの切り方、開発フローまで **全部これを読めば OK** です。

---

# 目次

1. [Git / GitHub とは？](#git--github-とは)
2. [開発で使う主な用語](#開発で使う主な用語)
3. [StudyTrack の開発ルール（GitHub Flow）](#studytrack-の開発ルールgithub-flow)
4. [実際の開発フロー（手順）](#実際の開発フロー手順)
5. [よくあるエラーと対処方法](#よくあるエラーと対処方法)
6. [FAQ](#faq)

---

# Git / GitHub とは？

### ■ Git とは？

ソースコードの「バージョン管理」をするためのツールです。

- ファイルの変更履歴を記録できる
- 複数人で安全に開発できる
- 間違えても過去に戻せる

→ プログラミング開発には必須のツール！

### ■ GitHub とは？

Git のデータをインターネット上で管理するサービス。

- ソースコードを保存できる
- ブランチを管理できる
- プルリクエストでレビューできる
- Issue でタスク管理できる

→ StudyTrack も GitHub で開発します。

---

# 開発で使う主な用語

### ■ リポジトリ（Repository）

プロジェクトのデータが入った “箱” のこと。

### ■ ブランチ（Branch）

開発用の作業場所。  
機能ごとに分岐して作業する。

例：

```
main
feature/add-editor
fix/login-bug
```

### ■ コミット（Commit）

「変更内容を保存」すること。

### ■ プルリクエスト（Pull Request）

自分のブランチの変更を main に取り込んでもらうための申請。

### ■ マージ（Merge）

PR の内容を main に取り込むこと。

---

# StudyTrack の開発ルール（GitHub Flow）

StudyTrack は **GitHub Flow** を採用。

流れはこの 6 ステップだけ 👇

1. **main を最新に更新する**
2. **main から作業用ブランチを作る**
3. **コードを書く**
4. **commit → push**
5. **PR（Pull Request）を作る**
6. **レビューして main にマージする**

---

# 実際の開発フロー（手順）

以下は **実際に作業するときの流れ**です。  
初心者でも迷わないよう、すべてコマンド付きで解説します。

---

## 1. リポジトリをクローンする

最初に一度だけ行います。

```
git clone https://github.com/Takumi-Itaya/study-track.git
cd study-track
```

---

## 2. main ブランチを最新にする

```
git checkout main
git pull origin main
```

---

## 3. Issue を確認する

作業内容は GitHub の Issue に登録されています。

- 自分が担当する Issue を選ぶ
- 内容を読む
- 必要なら質問する

---

## 4. 作業用ブランチを作成する（main から）

### ブランチ命名規則

```
feature/<機能名>
fix/<修正名>
chore/<雑務>
```

### 例

```
git checkout -b feature/add-markdown-editor
```

---

## 5. コードを編集する（frontend / backend）

VSCode などで自由に修正。

---

## 6. コミットする

### ステージング（変更の登録）

```
git add .
```

### コミット

```
git commit -m "Markdownエディタを追加"
```

---

## 7. GitHub に push する

```
git push origin feature/add-markdown-editor
※ 初回 push の場合
git push --set-upstream origin feature/add-markdown-editor
```

---

## 8. Pull Request（PR）を作成する

GitHub を開くとバナーが出ます：

> Compare & Pull Request

これをクリック。

### PR の内容を書く（テンプレあり）

- 何をしたか
- スクリーンショット
- Close #番号
- レビュー依頼

最後に **Create Pull Request** を押す。

---

## 9. レビュー対応する

レビューコメントが来たら：

- 修正する
- commit & push すれば PR に自動反映される

---

## 10. main にマージする

レビュー OK → GitHub 上で

**Merge Pull Request → Confirm Merge**

で main に取り込まれる。

---

## 11. ローカルの main を最新にする

```
git checkout main
git pull origin main
```

これを忘れると後でコンフリクトの原因になります。

---

# よくあるエラーと対処方法

### ❌ push が拒否される

```
error: failed to push some refs
```

▶ main が古い可能性

```
git pull origin main
```

---

### ❌ コンフリクト発生

VSCode が表示してくれるので  
「Accept Incoming / Accept Current」を選んで解決。

---

### ❌ pull すると変なファイルが大量に出た

→ ブランチを間違えている可能性が高い

```
git branch
```

で現在のブランチを確認。

---

# FAQ

### Q. main に直接 push してもいい？

❌ 絶対にダメです。  
必ず **ブランチ → PR → マージ** の流れで進めます。

### Q. ブランチ名は日本語でもいい？

❌ できるだけ英語で統一してください。

### Q. コミットメッセージは短くてもいい？

⭕ OK。ただし意味が分かる内容で。

### Q. Git を触ったことがないけど大丈夫？

⭕ この Onboarding を読めば問題なく開発できます！

---

# 🎉 おつかれさま！

これで StudyTrack に参加するために必要な知識はすべて揃いました。  
わからないことがあれば気軽に相談してください！
