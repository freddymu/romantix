"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, CalendarIcon, Clock, MapPin } from "lucide-react"

type Event = {
  id: number
  title: string
  date: Date
  time: string
  location: string
  category: "Date" | "Anniversary" | "Birthday" | "Other"
}

export default function SharedCalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Dinner Date",
      date: new Date(2023, 7, 15),
      time: "19:00",
      location: "Italian Restaurant",
      category: "Date",
    },
    {
      id: 2,
      title: "Anniversary",
      date: new Date(2023, 8, 1),
      time: "00:00",
      location: "Home",
      category: "Anniversary",
    },
  ])

  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date(),
    time: "",
    location: "",
    category: "Other",
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }])
      setNewEvent({
        title: "",
        date: new Date(),
        time: "",
        location: "",
        category: "Other",
      })
    }
  }

  const getEventsForSelectedDate = () => {
    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate?.getDate() &&
        event.date.getMonth() === selectedDate?.getMonth() &&
        event.date.getFullYear() === selectedDate?.getFullYear(),
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Shared Calendar</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events for {selectedDate?.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForSelectedDate().length > 0 ? (
              <ul className="space-y-4">
                {getEventsForSelectedDate().map((event) => (
                  <li key={event.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {event.category === "Date" && <CalendarIcon className="h-6 w-6 text-pink-500" />}
                      {event.category === "Anniversary" && <CalendarIcon className="h-6 w-6 text-red-500" />}
                      {event.category === "Birthday" && <CalendarIcon className="h-6 w-6 text-blue-500" />}
                      {event.category === "Other" && <CalendarIcon className="h-6 w-6 text-gray-500" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        <Clock className="inline-block h-4 w-4 mr-1" />
                        {event.time}
                      </p>
                      {event.location && (
                        <p className="text-sm text-muted-foreground">
                          <MapPin className="inline-block h-4 w-4 mr-1" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No events for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Calendar
                mode="single"
                selected={newEvent.date}
                onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Enter event location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newEvent.category}
                onValueChange={(value: "Date" | "Anniversary" | "Birthday" | "Other") =>
                  setNewEvent({ ...newEvent, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Date">Date</SelectItem>
                  <SelectItem value="Anniversary">Anniversary</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" onClick={handleAddEvent} className="w-full">
              Add Event
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

