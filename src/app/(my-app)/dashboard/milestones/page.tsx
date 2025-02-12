"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Milestone = {
  id: number
  title: string
  date: Date
  description: string
}

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: "First Date", date: new Date(2022, 5, 15), description: "Our first coffee date" },
    { id: 2, title: "Anniversary", date: new Date(2023, 5, 15), description: "One year together!" },
  ])
  const [newMilestone, setNewMilestone] = useState<Milestone>({
    id: 0,
    title: "",
    date: new Date(),
    description: "",
  })

  const handleAddMilestone = () => {
    if (newMilestone.title.trim() === "") return

    setMilestones((prevMilestones) => [...prevMilestones, { ...newMilestone, id: prevMilestones.length + 1 }])
    setNewMilestone({
      id: 0,
      title: "",
      date: new Date(),
      description: "",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-elegant-primary">Milestones</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-elegant-secondary hover:bg-elegant-secondary/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newMilestone.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newMilestone.date ? format(newMilestone.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newMilestone.date}
                      onSelect={(date) => setNewMilestone({ ...newMilestone, date: date || new Date() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                />
              </div>
              <Button onClick={handleAddMilestone} className="w-full">
                Add Milestone
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {milestones
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader>
                <CardTitle>{milestone.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{format(milestone.date, "MMMM d, yyyy")}</p>
                <p>{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

