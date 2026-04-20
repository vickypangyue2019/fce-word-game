'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, BookOpen, Volume2, HelpCircle } from 'lucide-react'
import { loadGameState } from '@/lib/storage'

export default function StartPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const savedState = loadGameState()

  const getUnlockedLevel = () => {
    if (!savedState) return 1
    return Math.min((savedState.completedLevels?.length || 0) + 1, 15)
  }

  const unlockedLevel = getUnlockedLevel()

  const handleSelectLevel = (level: number) => {
    if (level <= unlockedLevel) {
      setSelectedLevel(level)
    }
  }

  const levels = Array.from({ length: 15 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">选择关卡</h1>
          <p className="text-white/60">
            共15关 · 已解锁 {unlockedLevel} 关
            {savedState && (
              <span className="ml-4 text-purple-400">
                积分: {savedState.totalScore || savedState.score || 0}
              </span>
            )}
          </p>
        </div>

        {savedState && (savedState.wrongAnswers?.length || 0) > 0 && (
          <div className="mb-8 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-yellow-400" />
                <span>你有 {savedState.wrongAnswers?.length} 道错题待复习</span>
              </div>
              <Link
                href="/review"
                className="px-4 py-2 bg-yellow-500/30 hover:bg-yellow-500/40 rounded-lg text-sm transition-colors"
              >
                去复习
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-3">
          {levels.map((level) => {
            const isLocked = level > unlockedLevel
            const isCompleted = savedState?.completedLevels?.includes(level)

            return (
              <button
                key={level}
                onClick={() => handleSelectLevel(level)}
                disabled={isLocked}
                className={`
                  aspect-square rounded-xl font-bold text-xl transition-all
                  ${isLocked
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-green-500/30 text-green-400 hover:bg-green-500/40 border-2 border-green-500/50'
                    : level === unlockedLevel
                    ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
                `}
              >
                {level}
                {isCompleted && (
                  <span className="block text-xs mt-1">✓</span>
                )}
              </button>
            )
          })}
        </div>

        {selectedLevel && (
          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4">关卡 {selectedLevel}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href={`/game?level=${selectedLevel}&mode=practice`}
                className="flex items-center gap-3 p-4 bg-purple-600/30 hover:bg-purple-600/40 rounded-xl transition-colors"
              >
                <BookOpen className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="font-medium">练习模式</div>
                  <div className="text-sm text-white/60">学习词族，查看例句</div>
                </div>
              </Link>
              <Link
                href={`/game?level=${selectedLevel}&mode=challenge`}
                className="flex items-center gap-3 p-4 bg-pink-600/30 hover:bg-pink-600/40 rounded-xl transition-colors"
              >
                <Play className="w-6 h-6 text-pink-400" />
                <div>
                  <div className="font-medium">挑战模式</div>
                  <div className="text-sm text-white/60">计时答题，获得积分</div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center gap-3 text-blue-300">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm">提示：点击单词可听发音，选中文字可翻译</span>
          </div>
        </div>
      </main>
    </div>
  )
}
