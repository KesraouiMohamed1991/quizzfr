"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, Trophy, Clock } from "lucide-react"
import { QuizCard } from "./quiz-card"
import { type Question, type QuizResult, getRandomQuestions, getCategories, saveQuizResult } from "@/lib/quiz-utils"

interface QuizInterfaceProps {
  categoryId: string
  onBack: () => void
  onComplete: (result: QuizResult) => void
}

export function QuizInterface({ categoryId, onBack, onComplete }: QuizInterfaceProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [startTime, setStartTime] = useState<number>(Date.now())

  const categories = getCategories()
  const categoryName = categories[categoryId]?.name || ""

  useEffect(() => {
    const quizQuestions = getRandomQuestions(categoryId, 5)
    setQuestions(quizQuestions)
    setAnswers(new Array(quizQuestions.length).fill(-1))
    setStartTime(Date.now())
  }, [categoryId])

  useEffect(() => {
    if (isCompleted || showResult) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, isCompleted, showResult])

  const handleTimeUp = () => {
    if (answers[currentQuestionIndex] === -1) {
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = Math.floor(Math.random() * 4)
      setAnswers(newAnswers)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeRemaining(30)
    } else {
      completeQuiz()
    }
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)

    setShowResult(true)

    setTimeout(() => {
      setShowResult(false)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setTimeRemaining(30)
      } else {
        completeQuiz()
      }
    }, 2000)
  }

  const completeQuiz = () => {
    setIsCompleted(true)

    const correctAnswers = answers.filter((answer, index) => answer === questions[index]?.correct).length

    const percentage = Math.round((correctAnswers / questions.length) * 100)
    const timeSpent = Math.round((Date.now() - startTime) / 1000)

    const result: QuizResult = {
      categoryId,
      categoryName,
      score: correctAnswers,
      totalQuestions: questions.length,
      percentage,
      date: new Date().toISOString(),
      timeSpent,
      answers: answers.map((answer, index) => ({
        questionId: questions[index].id,
        selectedAnswer: answer,
        correct: answer === questions[index].correct,
      })),
    }

    saveQuizResult(result)
    onComplete(result)
  }

  const restartQuiz = () => {
    const quizQuestions = getRandomQuestions(categoryId, 5)
    setQuestions(quizQuestions)
    setAnswers(new Array(quizQuestions.length).fill(-1))
    setCurrentQuestionIndex(0)
    setTimeRemaining(30)
    setIsCompleted(false)
    setShowResult(false)
    setStartTime(Date.now())
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Chargement du quiz...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isCompleted) {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index]?.correct).length
    const percentage = Math.round((correctAnswers / questions.length) * 100)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
                  <h2 className="text-3xl font-bold text-foreground mb-2">Quiz terminé !</h2>
                  <p className="text-muted-foreground">{categoryName}</p>
                </div>

                <div className="mb-8">
                  <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
                  <p className="text-xl text-muted-foreground">
                    {correctAnswers} sur {questions.length} bonnes réponses
                  </p>
                  <Progress value={percentage} className="w-full mt-4" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Temps total</p>
                    <p className="font-semibold">{Math.round((Date.now() - startTime) / 1000)}s</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="font-semibold">
                      {percentage >= 80
                        ? "Excellent"
                        : percentage >= 60
                          ? "Bien"
                          : percentage >= 40
                            ? "Moyen"
                            : "À améliorer"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au tableau de bord
                  </Button>
                  <Button onClick={restartQuiz}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Refaire le quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">{categoryName}</h2>
          <p className="text-muted-foreground">Répondez aux questions dans le temps imparti</p>
        </div>

        <QuizCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeRemaining={timeRemaining}
          onAnswer={handleAnswer}
          showResult={showResult}
          selectedAnswer={answers[currentQuestionIndex]}
        />
      </div>
    </div>
  )
}
