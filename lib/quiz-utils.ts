import quizData from "@/data/quiz-questions.json"

export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Category {
  name: string
  questions: Question[]
}

export interface QuizResult {
  categoryId: string
  categoryName: string
  score: number
  totalQuestions: number
  percentage: number
  date: string
  timeSpent: number
  answers: Array<{
    questionId: number
    selectedAnswer: number
    correct: boolean
  }>
}

export const getCategories = () => {
  return quizData.categories
}

export const getCategoryQuestions = (categoryId: string) => {
  const category = quizData.categories[categoryId as keyof typeof quizData.categories]
  return category ? category.questions : []
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const getRandomQuestions = (categoryId: string, count = 5) => {
  const questions = getCategoryQuestions(categoryId)
  return shuffleArray(questions).slice(0, Math.min(count, questions.length))
}

export const saveQuizResult = (result: QuizResult) => {
  if (typeof window === "undefined") return

  const existingResults = getQuizResults()
  const updatedResults = [result, ...existingResults].slice(0, 50)

  localStorage.setItem("quizResults", JSON.stringify(updatedResults))
}

export const getQuizResults = (): QuizResult[] => {
  if (typeof window === "undefined") return []

  try {
    const resultsStr = localStorage.getItem("quizResults")
    return resultsStr ? JSON.parse(resultsStr) : []
  } catch {
    localStorage.removeItem("quizResults")
    return []
  }
}

export const getCategoryResults = (categoryId: string) => {
  return getQuizResults().filter((result) => result.categoryId === categoryId)
}

export const getQuizStats = () => {
  const results = getQuizResults()

  if (results.length === 0) {
    return {
      totalQuizzes: 0,
      averageScore: 0,
      bestScore: 0,
      categoryStats: {},
    }
  }

  const { totalQuizzes, averageScore, bestScore, categoryStats } = results.reduce(
    (acc, result) => {
      acc.totalQuizzes++
      acc.averageScore += result.percentage
      acc.bestScore = Math.max(acc.bestScore, result.percentage)

      if (!acc.categoryStats[result.categoryId]) {
        acc.categoryStats[result.categoryId] = {
          count: 0,
          averageScore: 0,
          bestScore: 0,
        }
      }

      const stats = acc.categoryStats[result.categoryId]
      stats.count++
      stats.averageScore =
        (stats.averageScore * (stats.count - 1) + result.percentage) / stats.count
      stats.bestScore = Math.max(stats.bestScore, result.percentage)

      return acc
    },
    {
      totalQuizzes: 0,
      averageScore: 0,
      bestScore: 0,
      categoryStats: {} as Record<string, { count: number; averageScore: number; bestScore: number }>,
    }
  )

  return {
    totalQuizzes,
    averageScore: Math.round(averageScore / totalQuizzes),
    bestScore: Math.round(bestScore),
    categoryStats,
  }
}

export function clearQuizResults() {
  localStorage.removeItem("quizResults")
}
