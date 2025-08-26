"use client"

import { useState, useEffect } from "react"
import { GoogleSignIn } from "@/components/google-sign-in"
import { Dashboard } from "@/components/dashboard"
import { QuizInterface } from "@/components/quiz-interface"
import { useAuth } from "@/hooks/use-auth"
import { getQuizResults, type QuizResult } from "@/lib/quiz-utils"

type AppState = "dashboard" | "quiz"

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [appState, setAppState] = useState<AppState>("dashboard")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [recentResults, setRecentResults] = useState<QuizResult[]>([])

  useEffect(() => {
    if (isAuthenticated) {
      setRecentResults(getQuizResults())
    }
  }, [isAuthenticated])

  const handleStartQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setAppState("quiz")
  }

  const handleQuizComplete = (result: QuizResult) => {
    setRecentResults(getQuizResults())
    setAppState("dashboard")
  }

  const handleBackToDashboard = () => {
    setAppState("dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="h-[85vh] bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Quiz Naturalisation</h1>
            <p className="text-muted-foreground">
              Préparez-vous à la naturalisation française avec nos quiz interactifs
            </p>
          </div>
          <GoogleSignIn />
        </div>
      </div>
    )
  }

  if (appState === "quiz" && selectedCategory) {
    return (
      <QuizInterface categoryId={selectedCategory} onBack={handleBackToDashboard} onComplete={handleQuizComplete} />
    )
  }

  return <Dashboard user={user} onStartQuiz={handleStartQuiz} recentResults={recentResults} />
}
