"use client"

import { StudyRecordList } from "@/components/study-record-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="dot-pattern min-h-full">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <StudyRecordList />

        {isLoggedIn && (
          <div className="mt-8 flex justify-center">
            <Link href="/create">
              <Button size="lg" className="group gap-2 rounded-full shadow-lg">
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                新しい記録を追加
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
