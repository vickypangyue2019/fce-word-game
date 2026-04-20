'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Play, BookOpen, Star, Heart, Crown } from 'lucide-react'
import { loadGameState, getLeaderboard, saveUserScore } from '@/lib/storage'

export default function Home() {
  const [userName, setUserName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number}[]>([])

  useEffect(() => {
    const saved = loadGameState()
    if (saved) {
      setUserName(saved.name || '')
    }
    setLeaderboard(getLeaderboard())
  }, [])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      localStorage.setItem('fce-user-name', userName.trim())
      const saved = loadGameState()
      if (saved) {
        saveUserScore(userName.trim(), saved.totalScore || 0)
      }
      setShowNameInput(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-sm text-white/60">
            Vicky Pang 独立开发
          </div>
          <div className="text-sm text-white/60">
            FCE词性转换 · 专注练习
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5" />
            <span className="font-medium">剑桥FCE备考必备</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            FCE词性转换大师
          </h1>

          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            专为剑桥FCE考生设计，通过科学练习掌握词性转换技巧
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-white/60">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>真实FCE真题例句</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Heart className="w-5 h-5 text-red-400" />
              <span>错题复习</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span>积分排行榜</span>
            </div>
          </div>

          {/* User Name Section */}
          {showNameInput ? (
            <form onSubmit={handleNameSubmit} className="max-w-md mx-auto mb-8">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="输入你的名字（用于排行榜）"
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                autoFocus
              />
              <div className="flex gap-4 mt-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors"
                >
                  开始学习
                </button>
                <button
                  type="button"
                  onClick={() => setShowNameInput(false)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {userName ? (
                <div className="text-white/60 mb-4">
                  欢迎回来，<span className="text-purple-400 font-medium">{userName}</span>！
                </div>
              ) : null}
              <Link
                href="/start"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                <Play className="w-6 h-6" />
                {userName ? '继续学习' : '开始学习'}
              </Link>
              {!userName && (
                <button
                  onClick={() => setShowNameInput(true)}
                  className="text-white/50 hover:text-white/70 text-sm underline"
                >
                  设置名字（用于排行榜）
                </button>
              )}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">词族学习</h3>
            <p className="text-white/60">掌握每个单词的各种形式，名词、动词、形容词、副词互相转换</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">闯关模式</h3>
            <p className="text-white/60">15个难度递进的关卡，从简单到困难，逐步提升</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">积分系统</h3>
            <p className="text-white/60">连击加分、错题扣分，排行榜展示学习成果</p>
          </div>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                排行榜
              </h2>
              <Link href="/leaderboard" className="text-purple-400 hover:text-purple-300 text-sm">
                查看全部
              </Link>
            </div>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div className="text-yellow-400 font-bold">
                    {user.score} 积分
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-white/40 text-sm">
        <p>FCE词性转换学习工具 · 专注FCE备考</p>
      </footer>
    </div>
  )
}
