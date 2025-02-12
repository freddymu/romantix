"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, MessageCircle, Trash2 } from "lucide-react"

type LogEntry = {
  id: number
  date: string
  type: string
  content: string
  mood: string
}

export default function CommunicationLogPage() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    {
      id: 1,
      date: "2023-07-15",
      type: "Conversation",
      content: "Discussed future plans and career goals.",
      mood: "Positive",
    },
    {
      id: 2,
      date: "2023-07-18",
      type: "Conflict",
      content: "Disagreement about household chores. Resolved through compromise.",
      mood: "Mixed",
    },
  ])

  const [newEntry, setNewEntry] = useState<Omit<LogEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    type: "",
    content: "",
    mood: "",
  })

  const handleAddEntry = () => {
    if (newEntry.type && newEntry.content && newEntry.mood) {
      setLogEntries([...logEntries, { ...newEntry, id: logEntries.length + 1 }])
      setNewEntry({
        date: new Date().toISOString().split("T")[0],
        type: "",
        content: "",
        mood: "",
      })
    }
  }

  const handleDeleteEntry = (id: number) => {
    setLogEntries(logEntries.filter((entry) => entry.id !== id))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Communication Log</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="type">Type</Label>
                <Select value={newEntry.type} onValueChange={(value) => setNewEntry({ ...newEntry, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conversation">Conversation</SelectItem>
                    <SelectItem value="Conflict">Conflict</SelectItem>
                    <SelectItem value="Milestone">Milestone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Describe the communication..."
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Overall Mood</Label>
              <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                <SelectTrigger id="mood">
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" onClick={handleAddEntry} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {logEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {entry.date} - {entry.type}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{entry.content}</p>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-elegant-secondary" />
                <span className="text-sm font-medium">{entry.mood}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

