"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type JournalEntry = {
  id: number
  date: Date
  prompt: string
  content: string
}

const prompts = [
  "What made you feel appreciated by your partner today?",
  "Describe a challenge you faced in your relationship recently. How did you handle it?",
  "What's one thing you'd like to improve in your relationship?",
  "Reflect on a moment of joy you shared with your partner recently.",
  "How have you grown as a person since being in this relationship?",
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: 0,
    date: new Date(),
    prompt: prompts[0],
    content: "",
  })

  const handleSave = () => {
    if (currentEntry.content.trim() === "") return

    setEntries((prevEntries) => [...prevEntries, { ...currentEntry, id: prevEntries.length + 1 }])
    setCurrentEntry({
      id: 0,
      date: new Date(),
      prompt: prompts[Math.floor(Math.random() * prompts.length)],
      content: "",
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Guided Journaling</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !currentEntry.date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentEntry.date ? format(currentEntry.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={currentEntry.date}
                  onSelect={(date) => setCurrentEntry({ ...currentEntry, date: date || new Date() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              value={currentEntry.prompt}
              onValueChange={(value) => setCurrentEntry({ ...currentEntry, prompt: value })}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a prompt" />
              </SelectTrigger>
              <SelectContent>
                {prompts.map((prompt, index) => (
                  <SelectItem key={index} value={prompt}>
                    {prompt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Write your journal entry here..."
            value={currentEntry.content}
            onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
            rows={10}
          />
          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Entry
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-elegant-primary">Previous Entries</h2>
        {entries.length === 0 ? (
          <p className="text-muted-foreground">No entries yet. Start journaling to see your entries here.</p>
        ) : (
          entries
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{format(entry.date, "MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{entry.prompt}</p>
                  <p className="text-muted-foreground">{entry.content}</p>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  )
}

