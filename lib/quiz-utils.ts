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

export const shuffleArray = (array: any[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const getRandomQuestions = (categoryId: string, count = 5) => {
  const questions = getCategoryQuestions(categoryId)
  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, Math.min(count, questions.length))
}

export const saveQuizResult = (result: QuizResult) => {
  if (typeof window === "undefined") return

  const existingResults = getQuizResults()
  const updatedResults = [result, ...existingResults].slice(0, 50)

  localStorage.setItem("quizResults", JSON.stringify(updatedResults))
}

export const getQuizResults = (): QuizResult[] => {
  if (typeof window === "undefined") return []

  const resultsStr = localStorage.getItem("quizResults")
  return resultsStr ? JSON.parse(resultsStr) : []
}

export const getCategoryResults = (categoryId: string) => {
  return getQuizResults().filter((result) => result.categoryId === categoryId)
}

export const getQuizStats = () => {
  const results = getQuizResults()

  let totalQuizzes = 0
  let averageScore = 0
  let bestScore = 0
  const categoryStats: Record<string, any> = {}

  results.forEach((result) => {
    totalQuizzes++
    averageScore += result.percentage
    bestScore = Math.max(bestScore, result.percentage)

    if (!categoryStats[result.categoryId]) {
      categoryStats[result.categoryId] = {
        count: 0,
        averageScore: 0,
        bestScore: 0,
      }
    }

    const stats = categoryStats[result.categoryId]
    stats.count++
    stats.averageScore = (stats.averageScore * (stats.count - 1) + result.percentage) / stats.count
    stats.bestScore = Math.max(stats.bestScore, result.percentage)
  })

  if (totalQuizzes > 0) {
    averageScore /= totalQuizzes
  }

  return {
    totalQuizzes,
    averageScore: Math.round(averageScore),
    bestScore: Math.round(bestScore),
    categoryStats,
  }
}
