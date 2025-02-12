"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft } from "lucide-react"

type Question = {
  id: number
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "How often do you and your partner communicate openly about your feelings?",
    options: ["Rarely", "Sometimes", "Often", "Very often", "Always"],
  },
  {
    id: 2,
    text: "How satisfied are you with the level of intimacy in your relationship?",
    options: ["Very unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very satisfied"],
  },
  {
    id: 3,
    text: "How well do you and your partner handle conflicts?",
    options: ["Very poorly", "Poorly", "Neutral", "Well", "Very well"],
  },
  {
    id: 4,
    text: "How much do you trust your partner?",
    options: ["Not at all", "A little", "Somewhat", "Mostly", "Completely"],
  },
  {
    id: 5,
    text: "How aligned are your future goals and plans with your partner's?",
    options: ["Not at all aligned", "Slightly aligned", "Somewhat aligned", "Mostly aligned", "Completely aligned"],
  },
]

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [assessmentComplete, setAssessmentComplete] = useState(false)

  const handleAnswer = (value: string) => {
    const score = questions[currentQuestionIndex].options.indexOf(value) + 1
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: score })

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setAssessmentComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 5
    return Math.round((totalScore / maxScore) * 100)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Relationship Health Assessment</h1>

      {!assessmentComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
            <CardDescription>
              Answer honestly to get the most accurate assessment of your relationship health.
            </CardDescription>
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
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentQuestionIndex < questions.length - 1 && (
                <Button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  disabled={!answers[questions[currentQuestionIndex].id]}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Complete</CardTitle>
            <CardDescription>Here's an overview of your relationship health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold mb-2">Your Relationship Health Score</p>
              <div className="text-5xl font-bold text-elegant-secondary">{calculateScore()}%</div>
            </div>
            <Progress value={calculateScore()} className="w-full h-4" />
            <p className="text-center text-muted-foreground">
              This score is based on your responses to the assessment questions. Remember, every relationship is unique,
              and this score is just a general indicator.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Next Steps:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Discuss these results with your partner</li>
                <li>Identify areas for improvement</li>
                <li>Set relationship goals together</li>
                <li>Consider relationship counseling or workshops</li>
              </ul>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setAssessmentComplete(false)
                setCurrentQuestionIndex(0)
                setAnswers({})
              }}
            >
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

