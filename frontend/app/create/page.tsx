"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useAuth } from "@/lib/auth-context"

export default function CreateRecordPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [referrer, setReferrer] = useState("/")
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/")
    } else {
      const params = new URLSearchParams(window.location.search)
      const from = params.get("from") || document.referrer
      if (from && (from.includes("/profile") || from.includes(window.location.origin))) {
        setReferrer(from.includes("/profile") ? "/profile" : "/")
      }
    }
  }, [isLoggedIn, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ subject, duration, category, notes })
    router.push(referrer)
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="dot-pattern min-h-full">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href={referrer}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {referrer === "/profile" ? "プロフィールに戻る" : "一覧に戻る"}
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-balance text-3xl font-bold leading-relaxed">新しい学習記録を追加</h1>
          <p className="mt-2 text-muted-foreground">今日の学習内容を記録しましょう（マークダウン形式対応）</p>
        </div>

        <Card className="border-2 bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-base">
                学習内容
              </Label>
              <Input
                id="subject"
                placeholder="例: React Hooks の復習"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="border-2"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-base">
                  学習時間（分）
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="border-2"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base">
                  カテゴリー
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category" className="border-2">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="プログラミング">プログラミング</SelectItem>
                    <SelectItem value="語学">語学</SelectItem>
                    <SelectItem value="数学">数学</SelectItem>
                    <SelectItem value="理科">理科</SelectItem>
                    <SelectItem value="資格">資格</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notes" className="text-base">
                  メモ（マークダウン対応）
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {showPreview ? "編集" : "プレビュー"}
                </Button>
              </div>

              {showPreview ? (
                <div className="dot-pattern-dense prose prose-sm min-h-[300px] max-w-none rounded-lg border-2 bg-muted/30 p-4 dark:prose-invert">
                  {notes ? (
                    <ReactMarkdown>{notes}</ReactMarkdown>
                  ) : (
                    <p className="text-muted-foreground">プレビューがここに表示されます</p>
                  )}
                </div>
              ) : (
                <Textarea
                  id="notes"
                  placeholder="# 学んだこと&#10;&#10;今日は**useEffect**と**useCallback**の違いについて学習しました。&#10;&#10;## ポイント&#10;&#10;- useEffectは副作用を扱う&#10;- useCallbackはメモ化されたコールバック&#10;&#10;\`\`\`javascript&#10;const callback = useCallback(() => {&#10;  // code here&#10;}, [deps]);&#10;\`\`\`&#10;&#10;**重要**: 依存配列の設定に注意！"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={12}
                  className="resize-none border-2 font-mono text-sm"
                />
              )}

              <p className="text-muted-foreground text-xs">
                マークダウン記法が使えます: # 見出し、**太字**、- リスト、\`\`\`コードブロック\`\`\` など
              </p>
            </div>

            <div className="flex gap-3 border-t pt-6">
              <Link href={referrer} className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  キャンセル
                </Button>
              </Link>
              <Button type="submit" className="flex-1">
                記録を保存
              </Button>
            </div>
          </form>
        </Card>

        <Card className="mt-6 border-2 bg-muted/30 p-6">
          <h3 className="mb-3 font-semibold text-sm">マークダウン記法のヒント</h3>
          <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
            <div>
              <code className="rounded bg-background px-1.5 py-0.5"># 見出し1</code>
              <span className="ml-2">大見出し</span>
            </div>
            <div>
              <code className="rounded bg-background px-1.5 py-0.5">## 見出し2</code>
              <span className="ml-2">中見出し</span>
            </div>
            <div>
              <code className="rounded bg-background px-1.5 py-0.5">**太字**</code>
              <span className="ml-2">強調表示</span>
            </div>
            <div>
              <code className="rounded bg-background px-1.5 py-0.5">- リスト</code>
              <span className="ml-2">箇条書き</span>
            </div>
            <div>
              <code className="rounded bg-background px-1.5 py-0.5">`コード`</code>
              <span className="ml-2">インラインコード</span>
            </div>
            <div>
              <code className="rounded bg-background px-1.5 py-0.5">\`\`\`コードブロック\`\`\`</code>
              <span className="ml-2">複数行コード</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
