"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import type { Question } from "@/lib/quiz-utils"

interface QuizCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  timeRemaining: number
  onAnswer: (answerIndex: number) => void
  showResult?: boolean
  selectedAnswer?: number
}

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onAnswer,
  showResult = false,
  selectedAnswer,
}: QuizCardProps) {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(null)

  const handleAnswerClick = (answerIndex: number) => {
    if (showResult) return

    setLocalSelectedAnswer(answerIndex)
    onAnswer(answerIndex)
  }

  const getButtonVariant = (index: number) => {
    if (!showResult) {
      return "outline"
    }

    if (index === question.correct) {
      return "default"
    }

    if (selectedAnswer === index && index !== question.correct) {
      return "destructive"
    }

    return "outline"
  }

  const getButtonClassName = (index: number) => {
    if (!showResult && localSelectedAnswer === index) {
      return "ring-2 ring-primary ring-offset-2"
    }
    return ""
  }

  const getButtonIcon = (index: number) => {
    if (!showResult) return null

    if (index === question.correct) {
      return <CheckCircle className="w-4 h-4 ml-2" />
    }

    if (selectedAnswer === index && index !== question.correct) {
      return <XCircle className="w-4 h-4 ml-2" />
    }

    return null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg">
            Question {questionNumber} sur {totalQuestions}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
        <Progress value={(questionNumber / totalQuestions) * 100} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground mb-6">{question.question}</h3>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={getButtonVariant(index)}
              className={`justify-start text-left h-auto p-4 whitespace-normal ${getButtonClassName(index)}`}
              onClick={() => handleAnswerClick(index)}
              disabled={showResult}
            >
              <span className="flex-1">{option}</span>
              {getButtonIcon(index)}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Explication :</h4>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
