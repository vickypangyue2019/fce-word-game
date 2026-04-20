'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FCEWordGame } from '@/components/FCEWordGame'
import { getWordFamiliesForLevel, getTotalLevels } from '@/data/wordFamilies'

function GameContent() {
  const searchParams = useSearchParams()
  const level = Math.min(
    Math.max(parseInt(searchParams.get('level') || '1'), 1),
    getTotalLevels()
  )
  const mode = searchParams.get('mode') || 'practice'
  const wordFamilies = getWordFamiliesForLevel(level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回关卡选择
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              第 {level} 关 / 共 {getTotalLevels()} 关
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              mode === 'challenge'
                ? 'bg-pink-100 text-pink-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {mode === 'challenge' ? '挑战模式' : '练习模式'}
            </span>
          </div>
        </div>
      </header>

      <FCEWordGame wordFamilies={wordFamilies} />
    </div>
  )
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <GameContent />
    </Suspense>
  )
}
