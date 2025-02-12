"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const questions = [
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
  // Add more questions here
]

export default function LoveLanguagesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: value })
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Love Languages Assessment</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
          <CardDescription>Discover your primary love language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full" />
          <p className="text-lg font-medium">{questions[currentQuestionIndex].text}</p>
          <RadioGroup onValueChange={handleAnswer} className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}

