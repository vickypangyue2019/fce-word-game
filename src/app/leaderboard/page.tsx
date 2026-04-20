'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, Crown, Medal, Award } from 'lucide-react'
import { getLeaderboard, loadGameState } from '@/lib/storage'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number, lastPlayed: string}[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setLeaderboard(getLeaderboard())
    const saved = loadGameState()
    if (saved?.name) {
      setUserName(saved.name)
    }
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <Trophy className="w-5 h-5 text-purple-400" />
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50'
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/50'
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/50'
      default: return 'bg-white/5 border border-white/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold">积分排行榜</h1>
          <p className="text-white/60 mt-2">看看谁是词性转换大师！</p>
        </div>

        {userName && (
          <div className="mb-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-purple-300">
                你的名字: <strong>{userName}</strong>
              </span>
              <span className="text-white/60 text-sm">继续学习获得更高积分吧！</span>
            </div>
          </div>
        )}

        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">暂无排名数据</p>
            <p className="text-white/40 text-sm mt-2">完成挑战赛即可上榜！</p>
            <Link
              href="/start"
              className="inline-block mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors"
            >
              去学习
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${getRankStyle(index + 1)}`}
              >
                <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                  {getRankIcon(index + 1)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-white/50">
                    {user.lastPlayed ? new Date(user.lastPlayed).toLocaleDateString('zh-CN') : ''}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-yellow-400">{user.score}</div>
                  <div className="text-xs text-white/50">积分</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Trophy className="w-5 h-5" />
            我要上榜！
          </Link>
        </div>
      </main>
    </div>
  )
}
