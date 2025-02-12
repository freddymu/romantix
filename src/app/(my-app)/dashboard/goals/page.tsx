"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, Target, Trash2, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Goal = {
  id: number
  title: string
  description: string
  progress: number
}

export default function RelationshipGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Improve Communication",
      description: "Practice active listening and express feelings more openly.",
      progress: 60,
    },
    {
      id: 2,
      title: "Plan Weekly Date Nights",
      description: "Schedule and follow through with a date night every week.",
      progress: 40,
    },
  ])

  const [newGoal, setNewGoal] = useState<Omit<Goal, "id" | "progress">>({
    title: "",
    description: "",
  })

  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description) {
      setGoals([...goals, { ...newGoal, id: goals.length + 1, progress: 0 }])
      setNewGoal({ title: "", description: "" })
    }
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
  }

  const handleUpdateGoal = () => {
    if (editingGoal) {
      setGoals(goals.map((goal) => (goal.id === editingGoal.id ? editingGoal : goal)))
      setEditingGoal(null)
    }
  }

  const handleProgressChange = (id: number, newProgress: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, progress: newProgress } : goal)))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Relationship Goals</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Enter goal title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Describe your goal..."
              />
            </div>
            <Button type="button" onClick={handleAddGoal} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                <Target className="inline mr-2 h-5 w-5 text-elegant-secondary" />
                {goal.title}
              </CardTitle>
              <div className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Goal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Goal Title</Label>
                        <Input
                          id="edit-title"
                          value={editingGoal?.title || ""}
                          onChange={(e) => setEditingGoal((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editingGoal?.description || ""}
                          onChange={(e) =>
                            setEditingGoal((prev) => (prev ? { ...prev, description: e.target.value } : null))
                          }
                        />
                      </div>
                      <Button onClick={handleUpdateGoal}>Update Goal</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="w-full" />
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => handleProgressChange(goal.id, Number.parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

