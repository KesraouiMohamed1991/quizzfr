"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Clock, TrendingUp, LogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import type { User } from "next-auth"
import { getCategories, getQuizStats, type QuizResult } from "@/lib/quiz-utils"
import Image from "next/image"

interface DashboardProps {
  user: User
  onStartQuiz: (categoryId: string) => void
  recentResults: QuizResult[]
}

export function Dashboard({ user, onStartQuiz, recentResults }: DashboardProps) {
  const { theme, setTheme } = useTheme()
  const categories = getCategories()
  const stats = getQuizStats()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
                  <Image
                         src="/favicon.png"
                         alt="Logo"
                         width={50}
                         height={50}
                         className="rounded-full"
                       />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Quiz Naturalisation</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || "User"} />
                  <AvatarFallback>
                    {(user.name || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Bienvenue, {user.name?.split(" ")[0] || "Utilisateur"} !
            </h2>
            <p className="text-muted-foreground">
              Préparez-vous à la naturalisation française avec nos quiz interactifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalQuizzes}</p>
                    <p className="text-sm text-muted-foreground">Quiz complétés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Trophy className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.bestScore}%</p>
                    <p className="text-sm text-muted-foreground">Meilleur score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-chart-2/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.averageScore}%</p>
                    <p className="text-sm text-muted-foreground">Score moyen</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-chart-3/10 rounded-lg">
                    <Clock className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{Object.keys(categories).length}</p>
                    <p className="text-sm text-muted-foreground">Catégories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Choisissez une catégorie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(categories).map(([categoryId, category]) => {
                const categoryStats = stats.categoryStats[categoryId]
                return (
                  <Card key={categoryId} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{category.questions.length} questions</Badge>
                        {categoryStats && <Badge variant="outline">{categoryStats.count} quiz</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {categoryStats && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Meilleur score</span>
                            <span>{Math.round(categoryStats.bestScore)}%</span>
                          </div>
                          <Progress value={categoryStats.bestScore} />
                        </div>
                      )}
                      <Button className="w-full" onClick={() => onStartQuiz(categoryId)}>
                        Commencer le quiz
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {recentResults.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Résultats récents</h3>
              <div className="grid gap-4">
                {recentResults.slice(0, 5).map((result, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{result.categoryName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">{result.percentage}%</p>
                          <p className="text-sm text-muted-foreground">
                            {result.score}/{result.totalQuestions}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
