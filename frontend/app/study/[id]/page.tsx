"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Clock, User, Heart, MessageCircle, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface StudyRecord {
  id: string
  subject: string
  duration: number
  date: string
  notes: string
  category: string
  username: string
  likes: number
  isLiked: boolean
}

interface Comment {
  id: string
  username: string
  content: string
  date: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

const recordData: Record<string, StudyRecord> = {
  "1": {
    id: "1",
    subject: "React Hooks の復習",
    duration: 120,
    date: "2025-01-09",
    notes: `# React Hooksの復習

今日は**useEffect**と**useCallback**の違いについて深く学習しました。

## 学んだこと

- \`useEffect\`は副作用を扱うためのフック
- \`useCallback\`はメモ化されたコールバックを返す
- 依存配列の重要性について理解が深まった

## コード例

\`\`\`javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

**重要**: パフォーマンス最適化には適切な依存配列の設定が不可欠。`,
    category: "プログラミング",
    username: "山田太郎",
    likes: 24,
    isLiked: false,
  },
  "2": {
    id: "2",
    subject: "英単語学習",
    duration: 45,
    date: "2025-01-09",
    notes: `# TOEIC頻出単語の暗記

## 今日の学習内容

TOEIC頻出単語**100個**を暗記しました。

### 工夫した点

- 例文と一緒に覚える
- 音声を聞きながら発音練習
- スペースドリピティションを活用

定着率が確実に上がっています！`,
    category: "語学",
    username: "佐藤花子",
    likes: 12,
    isLiked: false,
  },
  "3": {
    id: "3",
    subject: "数学の微分問題",
    duration: 90,
    date: "2025-01-08",
    notes: `# 微分の応用問題

微分の応用問題を**10問**解きました。

## 気づき

グラフの概形を描く問題が苦手だと気づきました。

- 極値の求め方は理解できている
- 增減表の作成も問題なし
- グラフの形状を想像するのが難しい

明日はグラフ問題を重点的に復習します。`,
    category: "数学",
    username: "鈴木一郎",
    likes: 18,
    isLiked: false,
  },
}

const sampleComments: Comment[] = [
  {
    id: "1",
    username: "田中美咲",
    content: "とても参考になりました！useCallbackの使い方がよく分かりました。",
    date: "2025-01-09",
  },
  {
    id: "2",
    username: "高橋健太",
    content: "依存配列の説明が分かりやすいですね。",
    date: "2025-01-09",
  },
]

export default async function StudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <StudyDetailPageClient id={id} />
}

function StudyDetailPageClient({ id }: { id: string }) {
  const [record, setRecord] = useState<StudyRecord>(recordData[id] || recordData["1"])
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const headings = record.notes.match(/^#{1,3} .+$/gm) || []
    const tocItems = headings.map((heading, index) => {
      const level = heading.match(/^#+/)?.[0].length || 1
      const text = heading.replace(/^#+\s/, "")
      const id = `heading-${index}`
      return { id, text, level }
    })
    setToc(tocItems)
  }, [record.notes])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    const headings = document.querySelectorAll("h1[id], h2[id], h3[id]")
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [record.notes])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      プログラミング: "bg-primary/10 text-primary border-primary/20",
      語学: "bg-accent/30 text-accent-foreground border-accent/40",
      数学: "bg-secondary text-secondary-foreground border-secondary",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  const handleLike = () => {
    setRecord({
      ...record,
      likes: record.isLiked ? record.likes - 1 : record.likes + 1,
      isLiked: !record.isLiked,
    })
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: String(comments.length + 1),
      username: "ゲストユーザー",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="dot-pattern min-h-full">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            一覧に戻る
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Record Detail Card */}
            <Card className="overflow-hidden border-2 bg-card p-6">
              <div className="flex flex-col gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{record.username}</p>
                    <p className="text-muted-foreground text-xs">{formatDate(record.date)}</p>
                  </div>
                </div>

                {/* Title and Category */}
                <div>
                  <h1 className="mb-3 text-balance text-3xl font-bold leading-relaxed">{record.subject}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`${getCategoryColor(record.category)} rounded-full`}>
                      {record.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{record.duration}分</span>
                    </div>
                  </div>
                </div>

                <div className="markdown-content dot-pattern-dense rounded-lg border bg-muted/30 p-6">
                  <ReactMarkdown
                    components={{
                      h1: ({ children, ...props }) => {
                        const index = toc.findIndex((item) => item.text === String(children))
                        const id = index >= 0 ? toc[index].id : undefined
                        return (
                          <h1 id={id} className="mb-4 mt-8 scroll-mt-20 text-3xl font-bold first:mt-0" {...props}>
                            {children}
                          </h1>
                        )
                      },
                      h2: ({ children, ...props }) => {
                        const index = toc.findIndex((item) => item.text === String(children))
                        const id = index >= 0 ? toc[index].id : undefined
                        return (
                          <h2 id={id} className="mb-3 mt-6 scroll-mt-20 text-2xl font-bold" {...props}>
                            {children}
                          </h2>
                        )
                      },
                      h3: ({ children, ...props }) => {
                        const index = toc.findIndex((item) => item.text === String(children))
                        const id = index >= 0 ? toc[index].id : undefined
                        return (
                          <h3 id={id} className="mb-2 mt-4 scroll-mt-20 text-xl font-semibold" {...props}>
                            {children}
                          </h3>
                        )
                      },
                      p: ({ children, ...props }) => (
                        <p className="mb-4 leading-relaxed" {...props}>
                          {children}
                        </p>
                      ),
                      ul: ({ children, ...props }) => (
                        <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
                          {children}
                        </ul>
                      ),
                      ol: ({ children, ...props }) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
                          {children}
                        </ol>
                      ),
                      li: ({ children, ...props }) => (
                        <li className="leading-relaxed" {...props}>
                          {children}
                        </li>
                      ),
                      code: ({ inline, className, children, ...props }: any) => {
                        return !inline ? (
                          <pre className="my-4 overflow-x-auto rounded-lg border bg-slate-900 p-4">
                            <code className="font-mono text-sm text-slate-100" {...props}>
                              {children}
                            </code>
                          </pre>
                        ) : (
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props}>
                            {children}
                          </code>
                        )
                      },
                      strong: ({ children, ...props }) => (
                        <strong className="font-bold text-foreground" {...props}>
                          {children}
                        </strong>
                      ),
                      blockquote: ({ children, ...props }) => (
                        <blockquote className="my-4 border-l-4 border-primary pl-4 italic" {...props}>
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {record.notes}
                  </ReactMarkdown>
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-3 border-t pt-4">
                  <Button
                    variant={record.isLiked ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${record.isLiked ? "fill-current" : ""}`} />
                    <span>{record.likes}</span>
                  </Button>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments.length}件のコメント</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="border-2 bg-card p-6">
              <h2 className="mb-4 font-semibold text-xl">コメント</h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <Textarea
                  placeholder="コメントを入力..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="mb-3 resize-none border-2"
                />
                <Button type="submit" size="sm">
                  コメントする
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{comment.username}</span>
                      <span className="text-muted-foreground text-xs">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-pretty text-sm leading-relaxed">{comment.content}</p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="py-8 text-center text-muted-foreground text-sm">まだコメントがありません</p>
                )}
              </div>
            </Card>
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="border-2 bg-card p-4">
                  <h3 className="mb-3 font-semibold text-sm">目次</h3>
                  <nav className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    <ul className="space-y-2 text-sm">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                          className="transition-colors"
                        >
                          <button
                            onClick={() => scrollToHeading(item.id)}
                            className={`w-full text-left text-pretty leading-relaxed transition-colors hover:text-primary ${
                              activeId === item.id ? "font-medium text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Card>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
