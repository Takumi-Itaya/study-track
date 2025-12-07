"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Calendar, User, Heart, MessageCircle, Search } from "lucide-react"

interface StudyRecord {
  id: string
  subject: string
  duration: number
  date: string
  notes: string
  category: string
  username: string
  userAvatar?: string
  likes: number
  comments: number
  tags: string[]
}

// Sample data with tags
const initialRecords: StudyRecord[] = [
  {
    id: "1",
    subject: "React Hooks の復習",
    duration: 120,
    date: "2025-01-09",
    notes: "useEffect と useCallback の違いを理解した。パフォーマンス最適化についても学習。",
    category: "プログラミング",
    username: "山田太郎",
    likes: 24,
    comments: 5,
    tags: ["React", "JavaScript", "フロントエンド"],
  },
  {
    id: "2",
    subject: "英単語学習",
    duration: 45,
    date: "2025-01-09",
    notes: "TOEIC頻出単語100個を暗記。例文と一緒に覚えることで定着率が上がった。",
    category: "語学",
    username: "佐藤花子",
    likes: 12,
    comments: 3,
    tags: ["英語", "TOEIC", "単語"],
  },
  {
    id: "3",
    subject: "数学の微分問題",
    duration: 90,
    date: "2025-01-08",
    notes: "微分の応用問題を10問解いた。グラフの概形を描く問題が苦手だと気づいた。",
    category: "数学",
    username: "鈴木一郎",
    likes: 18,
    comments: 7,
    tags: ["数学", "微分", "応用問題"],
  },
]

const tagColors: Record<string, string> = {
  React: "bg-gray-100 text-gray-700 border-gray-300",
  JavaScript: "bg-gray-200 text-gray-800 border-gray-400",
  フロントエンド: "bg-gray-100 text-gray-600 border-gray-300",
  英語: "bg-gray-200 text-gray-700 border-gray-400",
  TOEIC: "bg-gray-100 text-gray-700 border-gray-300",
  単語: "bg-gray-200 text-gray-800 border-gray-400",
  数学: "bg-gray-100 text-gray-700 border-gray-300",
  微分: "bg-gray-200 text-gray-700 border-gray-400",
  応用問題: "bg-gray-100 text-gray-600 border-gray-300",
}

export function StudyRecordList() {
  const [records] = useState<StudyRecord[]>(initialRecords)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract all unique tags
  const allTags = Array.from(new Set(records.flatMap((record) => record.tags)))

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag ? record.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

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
      プログラミング: "bg-gray-100 text-gray-700 border-gray-300",
      語学: "bg-gray-200 text-gray-800 border-gray-400",
      数学: "bg-gray-100 text-gray-600 border-gray-300",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-gray-100 text-gray-700 border-gray-300"
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="記録をタイトルで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-2 h-12 text-base"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
            selectedTag === null
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          すべて
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              selectedTag === tag ? getTagColor(tag) + " shadow-sm" : "border-border bg-background hover:bg-muted"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <h2 className="font-semibold text-2xl">学習記録</h2>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Link key={record.id} href={`/study/${record.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{record.username}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 text-balance text-xl font-semibold leading-relaxed">{record.subject}</h3>
                    <Badge variant="outline" className={`${getCategoryColor(record.category)} rounded-full`}>
                      {record.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {record.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className={`${getTagColor(tag)} rounded-full text-xs`}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{record.duration}分</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(record.date)}</span>
                  </div>
                </div>

                <div className="dot-pattern-dense rounded-lg border bg-muted/30 p-4">
                  <p className="line-clamp-2 text-pretty text-sm leading-relaxed">{record.notes}</p>
                </div>

                <div className="flex items-center gap-4 border-t pt-3 text-sm text-muted-foreground">
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
          </Link>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-muted p-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">検索条件に一致する記録が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
