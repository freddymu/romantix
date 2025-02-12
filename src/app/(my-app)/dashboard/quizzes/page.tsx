"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

type Question = {
  id: number
  text: string
  options: string[]
}

type Quiz = {
  id: number
  title: string
  description: string
  questions: Question[]
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Love Languages",
    description: "Discover your primary love language and understand how you prefer to give and receive love.",
    questions: [
      {
        id: 1,
        text: "I feel most loved when my partner...",
        options: [
          "Gives me a thoughtful gift",
          "Spends quality time with me",
          "Helps me with tasks or chores",
          "Gives me words of affirmation",
          "Shows physical affection",
        ],
      },
      {
        id: 2,
        text: "I show love to my partner by...",
        options: [
          "Buying them gifts",
          "Planning special dates",
          "Doing things to make their life easier",
          "Telling them how much I appreciate them",
          "Holding hands or cuddling",
        ],
      },
      // Add more questions here
    ],
  },
  {
    id: 2,
    title: "Attachment Styles",
    description: "Understand your attachment style and how it affects your relationships.",
    questions: [
      {
        id: 1,
        text: "In relationships, I tend to...",
        options: [
          "Feel secure and comfortable with intimacy",
          "Worry that my partner doesn't really love me",
          "Find it difficult to fully trust others",
          "Feel uncomfortable when others get too close",
        ],
      },
      {
        id: 2,
        text: "When my partner is away, I...",
        options: [
          "Feel confident in our relationship",
          "Worry they might leave me",
          "Enjoy the space and independence",
          "Feel relieved to have some distance",
        ],
      },
      // Add more questions here
    ],
  },
]

export default function QuizzesPage() {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setQuizCompleted(false)
  }

  const handleAnswer = (answer: string) => {
    if (!currentQuiz) return

    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }))

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setQuizCompleted(false)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Compatibility Quizzes</h1>

      {!currentQuiz ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => startQuiz(quiz)}>Start Quiz</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{currentQuiz.title}</CardTitle>
            <CardDescription>{currentQuiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <>
                <Progress value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100} className="mb-4" />
                <h2 className="text-xl font-semibold mb-4">
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </h2>
                <p className="mb-4">{currentQuiz.questions[currentQuestionIndex].text}</p>
                <RadioGroup onValueChange={handleAnswer} className="space-y-2">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-semibold">Quiz Completed!</h2>
                <p>Thank you for taking the {currentQuiz.title} quiz. Your results are being processed.</p>
                <Button onClick={resetQuiz}>Back to Quizzes</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

