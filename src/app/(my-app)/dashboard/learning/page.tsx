"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, CheckCircle, Lock } from "lucide-react"

type Module = {
  id: number
  title: string
  description: string
  progress: number
  lessons: Lesson[]
}

type Lesson = {
  id: number
  title: string
  completed: boolean
  locked: boolean
}

const modules: Module[] = [
  {
    id: 1,
    title: "Effective Communication",
    description: "Learn key strategies for clear and empathetic communication in relationships.",
    progress: 60,
    lessons: [
      { id: 1, title: "Active Listening", completed: true, locked: false },
      { id: 2, title: "Expressing Feelings", completed: true, locked: false },
      { id: 3, title: "Nonviolent Communication", completed: false, locked: false },
      { id: 4, title: "Conflict Resolution", completed: false, locked: true },
    ],
  },
  {
    id: 2,
    title: "Building Trust",
    description: "Explore techniques to build and maintain trust in your relationships.",
    progress: 25,
    lessons: [
      { id: 1, title: "Understanding Trust", completed: true, locked: false },
      { id: 2, title: "Honesty and Transparency", completed: false, locked: false },
      { id: 3, title: "Reliability and Consistency", completed: false, locked: true },
      { id: 4, title: "Rebuilding Broken Trust", completed: false, locked: true },
    ],
  },
  {
    id: 3,
    title: "Emotional Intelligence",
    description: "Develop your emotional awareness and management skills.",
    progress: 0,
    lessons: [
      { id: 1, title: "Self-Awareness", completed: false, locked: false },
      { id: 2, title: "Empathy", completed: false, locked: true },
      { id: 3, title: "Emotional Regulation", completed: false, locked: true },
      { id: 4, title: "Social Skills", completed: false, locked: true },
    ],
  },
]

export default function LearningPage() {
  const [selectedModule, setSelectedModule] = useState<Module>(modules[0])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Personalized Learning Modules</h1>

      <Tabs
        defaultValue={selectedModule.id.toString()}
        onValueChange={(value) => setSelectedModule(modules.find((m) => m.id.toString() === value) || modules[0])}
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          {modules.map((module) => (
            <TabsTrigger key={module.id} value={module.id.toString()}>
              {module.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="w-full" />

                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : lesson.locked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-elegant-secondary" />
                        )}
                        <span className={lesson.locked ? "text-gray-400" : ""}>{lesson.title}</span>
                      </div>
                      {lesson.completed ? (
                        <Badge variant="secondary">Completed</Badge>
                      ) : lesson.locked ? (
                        <Badge variant="outline">Locked</Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

