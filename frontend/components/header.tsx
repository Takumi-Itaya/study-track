"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Plus } from "lucide-react"
import { LoginDialog } from "@/components/login-dialog"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { isLoggedIn, username, avatarUrl, logout } = useAuth()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/study-track-icon.png"
              alt="Study Track Logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-bold text-xl">StudyTrack</span>
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    {avatarUrl ? <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} /> : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">{username}</p>
                    <p className="text-muted-foreground text-xs">学習記録 ユーザー</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/create")} className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  新しい記録を追加
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  プロフィール
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
    </header>
  )
}
