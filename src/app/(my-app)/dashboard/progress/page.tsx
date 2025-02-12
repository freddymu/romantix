"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PlusCircle } from "lucide-react"

type ProgressEntry = {
  id: number
  date: string
  category: string
  score: number
}

const categories = ["Communication", "Intimacy", "Trust", "Conflict Resolution", "Shared Goals", "Overall Satisfaction"]

export default function ProgressTrackingPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([
    { id: 1, date: "2023-07-01", category: "Communication", score: 7 },
    { id: 2, date: "2023-07-01", category: "Intimacy", score: 8 },
    { id: 3, date: "2023-07-01", category: "Trust", score: 9 },
    { id: 4, date: "2023-07-01", category: "Conflict Resolution", score: 6 },
    { id: 5, date: "2023-07-01", category: "Shared Goals", score: 7 },
    { id: 6, date: "2023-07-01", category: "Overall Satisfaction", score: 8 },
    { id: 7, date: "2023-08-01", category: "Communication", score: 8 },
    { id: 8, date: "2023-08-01", category: "Intimacy", score: 9 },
    { id: 9, date: "2023-08-01", category: "Trust", score: 9 },
    { id: 10, date: "2023-08-01", category: "Conflict Resolution", score: 7 },
    { id: 11, date: "2023-08-01", category: "Shared Goals", score: 8 },
    { id: 12, date: "2023-08-01", category: "Overall Satisfaction", score: 9 },
  ])

  const [newEntry, setNewEntry] = useState<Omit<ProgressEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    category: "",
    score: 5,
  })

  const handleAddEntry = () => {
    if (newEntry.category) {
      setEntries([...entries, { ...newEntry, id: entries.length + 1 }])
      setNewEntry({
        date: new Date().toISOString().split("T")[0],
        category: "",
        score: 5,
      })
    }
  }

  const getLatestScores = () => {
    const latestScores: { [key: string]: number } = {}
    entries.forEach((entry) => {
      if (!latestScores[entry.category] || new Date(entry.date) > new Date(latestScores[entry.category])) {
        latestScores[entry.category] = entry.score
      }
    })
    return latestScores
  }

  const getChartData = () => {
    const chartData: { [key: string]: { date: string; [key: string]: number } } = {}
    entries.forEach((entry) => {
      if (!chartData[entry.date]) {
        chartData[entry.date] = { date: entry.date }
      }
      chartData[entry.date][entry.category] = entry.score
    })
    return Object.values(chartData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Progress Tracking</h1>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chart">Progress Chart</TabsTrigger>
          <TabsTrigger value="add">Add Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Current Relationship Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(getLatestScores()).map(([category, score]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Progress value={score * 10} className="w-2/3" />
                        <span className="text-2xl font-bold">{score}/10</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  {categories.map((category, index) => (
                    <Line
                      key={category}
                      type="monotone"
                      dataKey={category}
                      stroke={`hsl(${index * 60}, 70%, 50%)`}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Progress Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newEntry.category}
                    onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Score (1-10)</Label>
                  <Input
                    id="score"
                    type="number"
                    min="1"
                    max="10"
                    value={newEntry.score}
                    onChange={(e) => setNewEntry({ ...newEntry, score: Number.parseInt(e.target.value) })}
                  />
                </div>
                <Button type="button" onClick={handleAddEntry} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Entry
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

