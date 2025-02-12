"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FeedbackType = "bug" | "feature" | "improvement" | "other"

export default function ConflictResolutionPage() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0])
  const [userResponse, setUserResponse] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    // In a real application, this would be processed by an AI to provide personalized feedback
    setFeedback(
      "Thank you for your response. Here's some general advice: Remember to use 'I' statements, actively listen to your partner's perspective, and work together to find a compromise that addresses both of your needs.",
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Conflict Resolution Tools</h1>

      <Card>
        <CardHeader>
          <CardTitle>Practice Scenario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedScenario.title}
            onValueChange={(value) => setSelectedScenario(scenarios.find((s) => s.title === value) || scenarios[0])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.title} value={scenario.title}>
                  {scenario.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-muted-foreground">{selectedScenario.description}</p>

          <Textarea
            placeholder="How would you approach this situation? Write your response here..."
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            rows={6}
          />

          <Button onClick={handleSubmit} className="w-full">
            Submit Response
          </Button>

          {feedback && (
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feedback}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">I-Statement Template</h3>
          <p>
            I feel <span className="font-italic">(emotion)</span> when <span className="font-italic">(situation)</span>{" "}
            because <span className="font-italic">(reason)</span>. I need <span className="font-italic">(request)</span>
            .
          </p>
          <h3 className="font-semibold">Active Listening Response</h3>
          <p>
            "I hear that you're saying <span className="font-italic">(paraphrase their point)</span>. Is that correct?
            Can you tell me more about how that makes you feel?"
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const scenarios = [
  {
    title: "Communication Breakdown",
    description: "You feel your partner isn't listening to your concerns about household chores.",
  },
  {
    title: "Differing Expectations",
    description: "You and your partner have different ideas about how to spend your free time together.",
  },
  {
    title: "Financial Disagreement",
    description: "You disagree with your partner about a major purchase they want to make.",
  },
]

