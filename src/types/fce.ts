export interface WordForm {
  word: string
  meaning?: string
  example?: string
}

export interface Exercise {
  sentence: string
  answer: string
  hint: string
  options: string[]
}

export interface WordFamily {
  root: string
  forms: {
    [formType: string]: WordForm | null
  }
  exercise: Exercise
}

export interface GameState {
  currentLevel: number
  score: number
  correctAnswers: number
  totalQuestions: number
  isPlaying: boolean
  wordFamilies: WordFamily[]
  combo: number
  maxCombo: number
  name?: string
  totalScore?: number
  streak?: number
  completedLevels?: number[]
  wrongAnswers?: WordForm[]
  lastPlayed?: string
}

export interface FCETopic {
  id: string
  name: string
  wordFamily: WordFamily[]
  difficulty: number
}

export interface Question {
  topic: FCETopic
  baseWord: string
  correctForm: WordForm
  options: WordForm[]
}
