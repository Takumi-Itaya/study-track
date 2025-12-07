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

const recordData: Record<string, any> = {
  "1": {
    id: "1",
    subject: "React Hooks の復習",
    duration: 120,
    category: "プログラミング",
    notes: `# React Hooksの復習

今日は**useEffect**と**useCallback**の違いについて深く学習しました。`,
  },
  "2": {
    id: "2",
    subject: "英単語学習",
    duration: 45,
    category: "語学",
    notes: `# TOEIC頻出単語の暗記

TOEIC頻出単語**100個**を暗記しました。`,
  },
}

export default function EditRecordPage({ params }: { params: { id: string } }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    const record = recordData[params.id]
    if (record) {
      setSubject(record.subject)
      setDuration(String(record.duration))
      setCategory(record.category)
      setNotes(record.notes)
    }
  }, [params.id, isLoggedIn, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ subject, duration, category, notes })
    router.push("/profile")
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="dot-pattern min-h-full">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/profile">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            プロフィールに戻る
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-balance text-3xl font-bold leading-relaxed">学習記録を編集</h1>
          <p className="mt-2 text-muted-foreground">記録の内容を更新しましょう</p>
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
                  placeholder="学習内容をマークダウン形式で記述..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={12}
                  className="resize-none border-2 font-mono text-sm"
                />
              )}
            </div>

            <div className="flex gap-3 border-t pt-6">
              <Link href="/profile" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  キャンセル
                </Button>
              </Link>
              <Button type="submit" className="flex-1">
                更新を保存
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
