"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart, MessageCircle, ArrowLeft, Edit, Trash2, Save, X, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface StudyRecord {
  id: string
  subject: string
  duration: number
  date: string
  notes: string
  category: string
  username: string
  likes: number
  comments: number
}

const mockRecords: StudyRecord[] = [
  {
    id: "1",
    subject: "React Hooks の復習",
    duration: 120,
    date: "2025-01-09",
    notes: "useEffectとuseCallbackについて学習しました",
    category: "プログラミング",
    username: "山田太郎",
    likes: 24,
    comments: 2,
  },
  {
    id: "2",
    subject: "英単語学習",
    duration: 45,
    date: "2025-01-09",
    notes: "TOEIC頻出単語100個を暗記",
    category: "語学",
    username: "山田太郎",
    likes: 12,
    comments: 1,
  },
]

export default function ProfilePage() {
  const { isLoggedIn, username, bio, avatarUrl, updateBio, updateAvatar } = useAuth()
  const router = useRouter()
  const [records, setRecords] = useState<StudyRecord[]>(mockRecords)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [editedBio, setEditedBio] = useState(bio)
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [avatarInput, setAvatarInput] = useState(avatarUrl)

  if (!isLoggedIn) {
    router.push("/")
    return null
  }

  const handleSaveBio = () => {
    updateBio(editedBio)
    setIsEditingBio(false)
  }

  const handleCancelBio = () => {
    setEditedBio(bio)
    setIsEditingBio(false)
  }

  const handleDeleteRecord = (id: string) => {
    if (confirm("この記録を削除しますか？")) {
      setRecords(records.filter((record) => record.id !== id))
    }
  }

  const handleSaveAvatar = () => {
    updateAvatar(avatarInput)
    setIsEditingAvatar(false)
  }

  const handleCancelAvatar = () => {
    setAvatarInput(avatarUrl)
    setIsEditingAvatar(false)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      プログラミング: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800",
      語学: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
      数学: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="dot-pattern min-h-full">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>

        <Card className="mb-8 border-2 bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                {avatarUrl ? <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} /> : null}
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                onClick={() => setIsEditingAvatar(true)}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1">
              <h1 className="mb-2 text-2xl font-bold">{username}</h1>

              {isEditingAvatar && (
                <div className="mb-4 space-y-3 rounded-lg border-2 bg-muted/30 p-4">
                  <Label htmlFor="avatar-url" className="text-sm font-medium">
                    アイコン画像のURL
                  </Label>
                  <Input
                    id="avatar-url"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatarInput}
                    onChange={(e) => setAvatarInput(e.target.value)}
                    className="border-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveAvatar} className="gap-2">
                      <Save className="h-4 w-4" />
                      保存
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelAvatar} className="gap-2 bg-transparent">
                      <X className="h-4 w-4" />
                      キャンセル
                    </Button>
                  </div>
                </div>
              )}

              {isEditingBio ? (
                <div className="space-y-3">
                  <Textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    rows={3}
                    className="resize-none border-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveBio} className="gap-2">
                      <Save className="h-4 w-4" />
                      保存
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelBio} className="gap-2 bg-transparent">
                      <X className="h-4 w-4" />
                      キャンセル
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-pretty text-muted-foreground leading-relaxed">{bio}</p>
                  <Button size="sm" variant="outline" onClick={() => setIsEditingBio(true)} className="gap-2">
                    <Edit className="h-4 w-4" />
                    自己紹介を編集
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-6 border-t pt-4">
            <div>
              <p className="font-semibold text-2xl">{records.length}</p>
              <p className="text-muted-foreground text-sm">投稿</p>
            </div>
            <div>
              <p className="font-semibold text-2xl">{records.reduce((sum, r) => sum + r.likes, 0)}</p>
              <p className="text-muted-foreground text-sm">いいね</p>
            </div>
            <div>
              <p className="font-semibold text-2xl">{records.reduce((sum, r) => sum + r.duration, 0)}</p>
              <p className="text-muted-foreground text-sm">総学習時間（分）</p>
            </div>
          </div>
        </Card>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">投稿した記録</h2>
          <Link href="/create?from=/profile">
            <Button size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              新しい記録を追加
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="group overflow-hidden border-2 bg-card transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/study/${record.id}`}>
                      <h3 className="mb-2 text-balance font-semibold text-lg leading-relaxed transition-colors group-hover:text-primary">
                        {record.subject}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className={`${getCategoryColor(record.category)} rounded-full`}>
                        {record.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{record.duration}分</span>
                      </div>
                      <span className="text-muted-foreground text-sm">{formatDate(record.date)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/edit/${record.id}`}>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Edit className="h-4 w-4" />
                        編集
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                      削除
                    </Button>
                  </div>
                </div>

                <p className="mb-4 text-pretty text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {record.notes}
                </p>

                <div className="flex items-center gap-4 border-t pt-3 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span>{record.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4" />
                    <span>{record.comments}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {records.length === 0 && (
            <Card className="border-2 bg-card p-12">
              <p className="text-center text-muted-foreground">まだ投稿がありません</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
