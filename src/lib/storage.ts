'use client'

import { GameState } from '@/types/fce'

const STORAGE_KEY = 'fce-word-game-data'

export interface StoredUserData {
  name: string
  score: number
  lastPlayed: string
}

export interface Player {
  name: string
}

export interface GameRecord {
  id: string
  playerName: string
  score: number
  wordsCompleted: number
  streak: number
  stars: number
  playedAt: string
}

export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function loadGameState(): GameState | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function getCurrentPlayer(): Player | null {
  if (typeof window === 'undefined') return null
  const name = localStorage.getItem('fce-user-name')
  if (!name) return null
  return { name }
}

export function saveGameRecord(record: GameRecord): void {
  if (typeof window === 'undefined') return
  const records = getGameRecords()
  records.push(record)
  localStorage.setItem('fce-game-records', JSON.stringify(records))

  const leaderboard = getLeaderboard()
  const existing = leaderboard.findIndex(u => u.name === record.playerName)
  if (existing >= 0) {
    if (record.score > leaderboard[existing].score) {
      leaderboard[existing].score = record.score
    }
    leaderboard[existing].lastPlayed = record.playedAt
  } else {
    leaderboard.push({
      name: record.playerName,
      score: record.score,
      lastPlayed: record.playedAt,
    })
  }
  leaderboard.sort((a, b) => b.score - a.score)
  localStorage.setItem('fce-leaderboard', JSON.stringify(leaderboard.slice(0, 10)))
}

export function getGameRecords(): GameRecord[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('fce-game-records')
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveUserScore(name: string, score: number): void {
  if (typeof window === 'undefined') return
  const leaderboard = getLeaderboard()
  const existing = leaderboard.findIndex(u => u.name === name)
  if (existing >= 0) {
    if (score > leaderboard[existing].score) {
      leaderboard[existing].score = score
    }
    leaderboard[existing].lastPlayed = new Date().toISOString()
  } else {
    leaderboard.push({
      name,
      score,
      lastPlayed: new Date().toISOString(),
    })
  }
  leaderboard.sort((a, b) => b.score - a.score)
  localStorage.setItem('fce-leaderboard', JSON.stringify(leaderboard.slice(0, 10)))
}

export function getLeaderboard(): StoredUserData[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('fce-leaderboard')
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}
