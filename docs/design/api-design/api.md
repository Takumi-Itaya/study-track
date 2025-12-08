# Study Track — API 仕様書

本ドキュメントは Study Track アプリの REST API 仕様をまとめたものです。  
認証方式は JWT（Bearer Token）を使用します。

---

# 目次

1. 共通仕様
2. 認証 API（Signup / Login）
3. ユーザー API
4. パスワード変更 API
5. 投稿（StudyRecords）API
6. コメント API
7. いいね API
8. タグ API

---

# =========================================

# 1. 共通仕様

# =========================================

## ■ リクエスト形式

- Content-Type: `application/json`

## ■ 認証方式（JWT）

- Authorization: Bearer <jwt-token>

## ■ タイムスタンプ形式

- 2025-12-08T12:00:00Z

---

# =========================================

# 2. 認証 API

# =========================================

## 🔐 POST /auth/signup

### 概要

新規ユーザー登録（サインアップ）。  
パスワードはハッシュ化して保存する。

### Request

```json
{
  "name": "Taku",
  "password": "password123"
}
```

### Response 201

```json
{
  "id": 1,
  "name": "Taku",
  "icon_url": null,
  "created_at": "2025-12-08T10:00:00"
}
```

---

## 🔐 POST /auth/login

### 概要

ログインを行い、JWT トークンを返却する。

### Request

```json
{
  "name": "Taku",
  "password": "password123"
}
```

### Response 200

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "name": "Taku",
    "icon_url": null
  }
}
```

### Response 401

```json
{
  "error": "invalid email or password"
}
```

---

# =========================================

# 3. ユーザー API

# =========================================

## 👤 GET /users/{id}

### 概要

ユーザー情報を取得する。

### Response 200

```json
{
  "id": 1,
  "name": "Taku",
  "bio": "Spring BootとNext.js勉強中",
  "icon_url": null,
  "created_at": "2025-12-08T10:00:00"
}
```

---

## 👤 PUT /users/{id}

### 概要

ユーザー情報を更新する（認証必須）。

### Request

```json
{
  "bio": "JavaとSpring Bootを強化中",
  "icon_url": "https://example.com/icon.png"
}
```

### Response 200

```json
{
  "id": 1,
  "name": "Taku",
  "bio": "JavaとSpring Bootを強化中",
  "icon_url": "https://example.com/icon.png",
  "updated_at": "2025-12-08T12:00:00"
}
```

---

# =========================================

# 4. パスワード変更 API

# =========================================

## 🔐 PUT /users/{id}/password

### 概要

パスワードを変更する。
旧パスワード一致確認が必要。

### Request

```json
{
  "old_password": "currentPassword123",
  "new_password": "NewStrongPassword456"
}
```

### Response 200

```json
{
  "message": "password updated successfully"
}
```

### Response 400

```json
{
  "error": "old password does not match"
}
```

### Response 403

```json
{
  "error": "forbidden"
}
```

---

# =========================================

# 5. 投稿（StudyRecords）API

# =========================================

## 📝 GET /records

### 概要

タイムライン投稿一覧（全ユーザー）。
作成日時の降順で返却。

### Response 200

```json
[
  {
    "id": 10,
    "title": "SpringのDI理解",
    "content": "AutowiredやComponentScanを学んだ",
    "study_hours": 3,
    "user": { "id": 1, "name": "Taku" },
    "likes_count": 5,
    "comments_count": 3,
    "created_at": "2025-12-08T15:00:00"
  }
]
```

---

## 📝 GET /records/{id}

### Response 200

```json
{
  "id": 10,
  "title": "SpringのDI理解",
  "content": "AutowiredやComponentScanを学んだ",
  "study_hours": 3,
  "user": { "id": 1, "name": "Taku" },
  "tags": ["Java", "Spring"],
  "likes_count": 5,
  "created_at": "2025-12-08T15:00:00"
}
```

---

## 📝 POST /records

### 概要

投稿を作成する（認証必須）。

### Request

```json
{
  "title": "Docker 勉強",
  "content": "composeを理解した",
  "study_hours": 2,
  "tags": ["Docker", "DevOps"]
}
```

### Response 201

```json
{
  "id": 11,
  "title": "Docker 勉強",
  "content": "composeを理解した",
  "study_hours": 2,
  "created_at": "2025-12-08T12:00:00"
}
```

---

## 📝 PUT /records/{id}

### Request

```json
{
  "title": "Docker 学習まとめ",
  "content": "Dockerfile も学んだ",
  "study_hours": 3
}
```

### Response 200

```json
{
  "id": 11,
  "title": "Docker 学習まとめ",
  "content": "Dockerfile も学んだ",
  "study_hours": 3,
  "updated_at": "2025-12-08T13:00:00"
}
```

---

## 📝 DELETE /records/{id}

### Response 204

---

# =========================================

# 6. コメント API

# =========================================

## 💬 GET /records/{id}/comments

### Response 200

```json
[
  {
    "id": 1,
    "content": "良い学びですね！",
    "user": { "id": 3, "name": "Ken" },
    "created_at": "2025-12-08T15:30:00"
  }
]
```

---

## 💬 POST /records/{id}/comments

### Request

```json
{
  "content": "とても参考になります！"
}
```

### Response 201

```json
{
  "id": 12,
  "content": "とても参考になります！",
  "created_at": "2025-12-08T15:31:00"
}
```

---

## PUT /comments/{id}

### Request

```json
{
  "content": "文章を少し修正しました"
}
```

### Response 200

```json
{
  "id": 12,
  "content": "文章を少し修正しました",
  "updated_at": "2025-12-08T15:40:00"
}
```

---

## 💬 DELETE /comments/{id}

### Response 204

---

# =========================================

# 7. いいね API

# =========================================

## ❤️ POST /records/{id}/likes

### Response 201

```json
{
  "record_id": 11,
  "liked": true
}
```

---

## ❤️ DELETE /records/{id}/likes

### Response 200

```json
{
  "record_id": 11,
  "liked": false
}
```

---

# =========================================

# 8. タグ API

# =========================================

## 🏷 GET /tags

### Response 200

```json
[
  { "id": 1, "name": "Java" },
  { "id": 2, "name": "Spring" }
]
```

---

## 🏷 POST /records/{id}/tags

### Request

```json
{
  "tag": "Java"
}
```

### Response 201

```json
{
  "record_id": 11,
  "tag": "Java"
}
```

---

## 🏷 DELETE /records/{id}/tags/{tagId}

### Response 204

---
