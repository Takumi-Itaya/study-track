"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimateOnScroll, StaggerContainer } from "@/components/animate-on-scroll"
import {
  TrendingUp,
  Users,
  Target,
  BookOpen,
  Calendar,
  Heart,
  UserPlus,
  Clock,
  MessageCircle,
} from "lucide-react"

export default function LandingPage() {
  // Hero animation state
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* =====================================
          1. Hero Section
          目的: 3秒で「自分ごと」化させる
          アニメーション: ステージャードフェードイン（上から順に）
      ===================================== */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        {/* 背景のドットパターン */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左: テキスト - ステージャードアニメーション */}
            <div className="flex flex-col justify-center">
              {/* Headline - 最優先の視線誘導 */}
              <h1
                className={`mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 transition-all duration-1000 ease-out sm:text-5xl lg:text-6xl ${
                  heroLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                その勉強、成果として伝わってますか？
              </h1>

              {/* Sub Copy - Headlineとセット */}
              <p
                className={`mb-8 text-xl text-gray-600 transition-all delay-200 duration-1000 ease-out sm:text-2xl ${
                  heroLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                日々の学びを評価につなげる、新しいSNS。
              </p>

              {/* CTA */}
              <div
                className={`flex flex-col gap-4 transition-all delay-400 duration-1000 ease-out sm:flex-row ${
                  heroLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  size="lg"
                  className="group bg-gray-900 px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
                >
                  <span className="transition-transform group-hover:translate-x-1">
                    Study Track を始める →
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 px-8 py-6 text-lg font-semibold text-gray-900 transition-all hover:bg-gray-50"
                >
                  ログイン
                </Button>
              </div>
            </div>

            {/* 右: プロダクトUIモック - フェードイン */}
            <div
              className={`relative flex items-center justify-center transition-all delay-300 duration-1000 ease-out ${
                heroLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                {/* プロダクトスクリーンショットのモック */}
                <div className="flex h-full flex-col">
                  {/* ヘッダー */}
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-900" />
                      <span className="font-semibold text-gray-900">StudyTrack</span>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="flex-1 p-6">
                    {/* 学習記録カード */}
                    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        <div>
                          <div className="font-medium text-gray-900">山田太郎</div>
                          <div className="text-sm text-gray-500">2時間前</div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-bold text-gray-900">TypeScript入門書を読了</h3>
                      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>120分</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                          TypeScript
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                          プログラミング
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">24</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">5</span>
                        </div>
                      </div>
                    </div>

                    {/* カレンダービュー */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-3 text-sm font-medium text-gray-700">学習カレンダー</div>
                      <div className="grid grid-cols-7 gap-1">
                        {[...Array(28)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-6 w-6 rounded-sm ${
                              [2, 3, 5, 8, 9, 10, 12, 15, 16, 19, 22, 23, 24, 26].includes(i)
                                ? i % 3 === 0
                                  ? "bg-gray-900"
                                  : "bg-gray-600"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 装飾的なグロー効果 */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gray-200/50 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gray-300/50 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          2. Problem Section
          目的: 「これは自分の悩みだ」と確信させる
          アニメーション: フェードアップ
      ===================================== */}
      <section className="border-b border-gray-200 bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="space-y-8 text-lg leading-relaxed text-gray-700">
              <p className="text-xl">
                技術書を読んだ。オンライン講座を修了した。業務時間外に何時間も学んだ。
              </p>

              <p>
                でも、その努力は誰にも伝わらない。
                <br />
                職務経歴書には書けない。面談でも説明しづらい。
              </p>

              <p className="border-l-4 border-gray-900 py-2 pl-6 text-xl font-bold text-gray-900">
                「勉強しています」と口で言っても、証拠がない。
              </p>

              <p>
                結果、評価されるのは目に見える成果を出した人だけ。
                <br />
                水面下での努力は、評価者の目には映らない。
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* =====================================
          3. Insight Section
          目的: 問題の本質を言語化
          アニメーション: フェードアップ
      ===================================== */}
      <section className="border-b border-gray-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="space-y-8 text-lg leading-relaxed text-gray-700">
              <p className="text-xl">多くの社会人が気づいている。</p>

              <p>
                努力の「過程」は評価されない。
                <br />
                「結果」だけが見られる世界だ。
              </p>

              <p>
                けれど、本当は知っているはずだ。
                <br />
                大きな成果の裏には、無数の小さな積み重ねがある。
              </p>

              <p className="border-l-4 border-gray-900 py-2 pl-6 text-xl font-bold text-gray-900">
                問題は、その積み重ねが可視化されていないこと。
              </p>

              <p>
                毎日コツコツ学んでいる人と、何もしていない人が、同じに見える。
                <br />
                評価は、記憶ではなく「記録」に基づいて行われる。
                <br />
                記録がなければ、どんな努力も存在しないのと同じだ。
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* =====================================
          4. Solution Section
          目的: 「なるほど、こう解決するのか」と腹落ちさせる
          アニメーション: 3カラムが順番にフェードイン
      ===================================== */}
      <section className="border-b border-gray-200 bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* セクションタイトル */}
          <AnimateOnScroll animation="fade-up">
            <div className="mb-16 text-center">
              <p className="text-xl text-gray-700 lg:text-2xl">
                Study Track は、日々の学びを「記録」として残し、「評価」につなげるSNSです。
              </p>
            </div>
          </AnimateOnScroll>

          {/* 3つの価値の柱 */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* 価値1: 可視化 */}
            <AnimateOnScroll animation="fade-up" delay={0}>
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 transition-transform duration-300 group-hover:scale-110">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  勉強を、可視化する
                </h3>
                <p className="leading-relaxed text-gray-700">
                  何を、どれくらい学んだのか。
                  <br />
                  それを時系列で残せば、あなたの成長は「データ」になる。
                </p>
              </div>
            </AnimateOnScroll>

            {/* 価値2: 信頼 */}
            <AnimateOnScroll animation="fade-up" delay={150}>
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  記録を、信頼に変える
                </h3>
                <p className="leading-relaxed text-gray-700">
                  継続的に学んでいる事実は、あなたの信頼性を高める。
                  <br />
                  転職活動、社内評価、クライアントへのアピール。
                  <br />
                  あらゆる場面で、あなたの努力は「説明できる根拠」になる。
                </p>
              </div>
            </AnimateOnScroll>

            {/* 価値3: つながり */}
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  学びを、つながりに変える
                </h3>
                <p className="leading-relaxed text-gray-700">
                  同じ分野を学ぶ人、同じ目標を持つ人。
                  <br />
                  記録を共有することで、偶然の出会いが生まれる。
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* 締めのメッセージ */}
          <AnimateOnScroll animation="fade-up" delay={450}>
            <div className="mt-16 text-center">
              <p className="text-2xl font-bold text-gray-900 lg:text-3xl">
                努力が、ちゃんと伝わる場所。
              </p>
              <p className="mt-3 text-xl text-gray-700">それが Study Track です。</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* =====================================
          5. Features Section
          目的: 機能ではなく「使った後の姿」を想像させる
          アニメーション: 左右からスライドイン
      ===================================== */}
      <section className="border-b border-gray-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <h2 className="mb-16 text-center text-4xl font-bold text-gray-900 lg:text-5xl">
              Features
            </h2>
          </AnimateOnScroll>

          <div className="space-y-24 lg:space-y-32">
            {/* Feature 1: 学習ログ投稿 - 左テキスト / 右UI */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimateOnScroll animation="fade-right">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">学習ログ投稿</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    勉強内容、時間、メモを記録。
                    <br />
                    シンプルな入力で、学びがストックされていく。
                  </p>
                  <div className="rounded-xl bg-gray-100 p-5">
                    <p className="font-semibold text-gray-900">
                      価値：後から振り返れる「学習の履歴書」になる。
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                  <div className="absolute inset-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 text-sm font-medium text-gray-500">新規学習記録</div>
                    <div className="mb-3 h-10 rounded-lg bg-gray-100" />
                    <div className="mb-3 h-10 rounded-lg bg-gray-100" />
                    <div className="h-24 rounded-lg bg-gray-50" />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 2: タイムライン - 右テキスト / 左UI */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimateOnScroll animation="fade-right" className="order-2 lg:order-1">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                  <div className="absolute inset-4 space-y-3 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-300" />
                          <div className="h-3 w-20 rounded bg-gray-200" />
                        </div>
                        <div className="mt-2 h-3 w-3/4 rounded bg-gray-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left" className="order-1 lg:order-2">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">タイムライン</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    フォローした人の学びが、リアルタイムで流れる。
                    <br />
                    誰が何を学んでいるかが見える。
                  </p>
                  <div className="rounded-xl bg-gray-100 p-5">
                    <p className="font-semibold text-gray-900">
                      価値：孤独な勉強が、仲間のいる環境に変わる。
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 3: 可視化 - 左テキスト / 右UI */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimateOnScroll animation="fade-right">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">可視化</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    カレンダー形式で学習量を表示。
                    <br />
                    どれだけ継続しているかが一目でわかる。
                  </p>
                  <div className="space-y-3 rounded-xl bg-gray-100 p-5">
                    <p className="font-semibold text-gray-900">
                      価値：「頑張っている」を証明できる。
                    </p>
                    <p className="font-semibold text-gray-900">
                      価値：「頑張っている」を、第三者に説明できる。
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                  <div className="absolute inset-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 text-sm font-medium text-gray-700">学習カレンダー</div>
                    <div className="grid grid-cols-7 gap-2">
                      {[...Array(35)].map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-md ${
                            [2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26, 29, 30, 31, 33].includes(
                              i
                            )
                              ? i % 4 === 0
                                ? "bg-gray-900"
                                : i % 3 === 0
                                  ? "bg-gray-700"
                                  : "bg-gray-500"
                              : "bg-gray-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 4: フォロー/いいね - 右テキスト / 左UI */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimateOnScroll animation="fade-right" className="order-2 lg:order-1">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                  <div className="absolute inset-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-300" />
                        <div>
                          <div className="h-4 w-24 rounded bg-gray-200" />
                          <div className="mt-1 h-3 w-16 rounded bg-gray-100" />
                        </div>
                      </div>
                      <div className="rounded-full bg-gray-900 px-4 py-2 text-sm text-white">
                        フォロー
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Heart className="h-6 w-6 text-gray-400" />
                        <span className="text-gray-600">128</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-6 w-6 text-gray-400" />
                        <span className="text-gray-600">24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left" className="order-1 lg:order-2">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">フォロー / いいね</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    気になる人をフォロー。共感した学びには「いいね」。
                    <br />
                    ゆるくつながりながら、刺激を受け合う。
                  </p>
                  <div className="rounded-xl bg-gray-100 p-5">
                    <p className="font-semibold text-gray-900">
                      価値：承認と発見が、学びを加速させる。
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Feature 5: プロフィール - 左テキスト / 右UI */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimateOnScroll animation="fade-right">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">プロフィール</h3>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    学習分野、目標、これまでの記録が集約される。
                    <br />
                    あなたの「学びの軌跡」が、一つのページに。
                  </p>
                  <div className="rounded-xl bg-gray-100 p-5">
                    <p className="font-semibold text-gray-900">
                      価値：面接や商談で見せられる、実績の可視化。
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
                  <div className="absolute inset-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-300" />
                      <div>
                        <div className="h-5 w-32 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="mb-4 flex gap-6 text-sm text-gray-600">
                      <span>
                        <strong className="text-gray-900">156</strong> 記録
                      </span>
                      <span>
                        <strong className="text-gray-900">89</strong> フォロワー
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                        TypeScript
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">React</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">AWS</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          6. Use Cases Section
          目的: 「自分が使っている未来」を具体化
          アニメーション: カードがスケールアップ
      ===================================== */}
      <section className="border-b border-gray-200 bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <h2 className="mb-16 text-center text-4xl font-bold text-gray-900 lg:text-5xl">
              Use Cases
            </h2>
          </AnimateOnScroll>

          <div className="grid gap-6 md:grid-cols-2">
            {/* ケース1 */}
            <AnimateOnScroll animation="scale" delay={0}>
              <Card className="group h-full border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                  ケース1
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  転職活動中のエンジニア
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  面接で「最近何を勉強していますか？」と聞かれたとき。
                  <br />
                  Study Track のプロフィールを見せれば、半年間の学習履歴が一瞬で伝わる。
                </p>
                <p className="font-semibold text-gray-900">口だけでなく、行動で示せる。</p>
              </Card>
            </AnimateOnScroll>

            {/* ケース2 */}
            <AnimateOnScroll animation="scale" delay={100}>
              <Card className="group h-full border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                  ケース2
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  社内評価を上げたいビジネスパーソン
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  上司に「自己啓発していますか？」と聞かれたとき。
                  <br />
                  記録を見せれば、毎週末に学習していることが証明できる。
                </p>
                <p className="font-semibold text-gray-900">目に見える努力は、信頼につながる。</p>
              </Card>
            </AnimateOnScroll>

            {/* ケース3 */}
            <AnimateOnScroll animation="scale" delay={200}>
              <Card className="group h-full border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                  ケース3
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">フリーランスの実績づくり</h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  クライアントに提案する際、「この分野を最近学んでいます」と言える。
                  <br />
                  Study Track の記録が、スキルの裏付けになる。
                </p>
                <p className="font-semibold text-gray-900">
                  学習姿勢そのものが、差別化要素になる。
                </p>
              </Card>
            </AnimateOnScroll>

            {/* ケース4 */}
            <AnimateOnScroll animation="scale" delay={300}>
              <Card className="group h-full border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                  ケース4
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">学習仲間を見つけたい人</h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  タイムラインで同じ技術書を読んでいる人を発見。
                  <br />
                  フォローして、学びを共有し合う。
                </p>
                <p className="font-semibold text-gray-900">
                  一人じゃない、という感覚が続けるモチベーションになる。
                </p>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* =====================================
          7. Value / Philosophy Section
          目的: 共感と信頼を獲得
          アニメーション: フェードイン + キーメッセージ強調
      ===================================== */}
      <section className="border-b border-gray-200 bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <h2 className="mb-16 text-center text-4xl font-bold text-gray-900 lg:text-5xl">
              なぜこのサービスを作るのか
            </h2>
          </AnimateOnScroll>

          <div className="space-y-16 text-center">
            <AnimateOnScroll animation="fade-up">
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p className="text-xl">努力は、報われるべきだ。</p>

                <p>
                  でも現実には、見えない努力は評価されない。
                  <br />
                  それは不公平だと思う。
                </p>
              </div>
            </AnimateOnScroll>

            {/* キーメッセージ - 大きく強調 */}
            <AnimateOnScroll animation="scale">
              <div className="py-8">
                <p className="text-3xl font-bold leading-relaxed text-gray-900 lg:text-4xl">
                  Study Track は、努力を可視化するインフラです。
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up">
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  勉強している人が、ちゃんと評価される。
                  <br />
                  学び続ける人が、信頼される。
                </p>

                <p>そんな世界を作りたい。</p>
              </div>
            </AnimateOnScroll>

            {/* 区切り */}
            <div className="py-4">
              <div className="mx-auto h-px w-24 bg-gray-300" />
            </div>

            <AnimateOnScroll animation="fade-up">
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p className="text-xl">社会人の学びは、孤独だ。</p>

                <p>
                  誰も見ていない。誰も褒めてくれない。
                  <br />
                  それでも、毎日少しずつ積み上げている人がいる。
                </p>
              </div>
            </AnimateOnScroll>

            {/* キーメッセージ2 */}
            <AnimateOnScroll animation="scale">
              <div className="py-8">
                <p className="text-3xl font-bold leading-relaxed text-gray-900 lg:text-4xl">
                  その人たちの努力が、ちゃんと記録として残る場所。
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up">
              <p className="text-xl text-gray-700">それが Study Track です。</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* =====================================
          8. Final CTA Section
          目的: 迷わせず、行動させる
          アニメーション: ズームイン
      ===================================== */}
      <section className="relative overflow-hidden bg-gray-900 py-20 text-white lg:py-32">
        {/* 背景のグラデーション装飾 */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gray-800 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gray-800 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll animation="scale">
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">あなたの努力を、残そう。</h2>

            <p className="mb-10 text-xl text-gray-300 lg:text-2xl">
              今日から、学びを記録する。
              <br />
              未来の評価は、今日の記録で決まる。
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group bg-white px-10 py-7 text-lg font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                <span className="transition-transform group-hover:translate-x-1">
                  Study Track を始める →
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent px-10 py-7 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                ログイン
              </Button>
            </div>

            <p className="mt-16 text-lg italic text-gray-400">学びを、成果に変える。</p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
