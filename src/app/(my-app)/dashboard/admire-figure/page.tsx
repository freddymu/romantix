"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

type AdmireFigure = {
  id: number
  name: string
  description: string
}

export default function AdmireFigurePage() {
  const [figures, setFigures] = useState<AdmireFigure[]>([
    { id: 1, name: "Marie Curie", description: "Pioneering scientist in radioactivity" },
    { id: 2, name: "Nelson Mandela", description: "Anti-apartheid revolutionary and former President of South Africa" },
    { id: 3, name: "Jane Goodall", description: "Primatologist and anthropologist" },
  ])

  const addFigure = () => {
    // In a real app, this would open a modal or form to add a new figure
    const newFigure = { id: figures.length + 1, name: "New Figure", description: "Description" }
    setFigures([...figures, newFigure])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-elegant-primary">Admire Figures</h1>
        <Button onClick={addFigure} className="bg-elegant-secondary hover:bg-elegant-secondary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Figure
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {figures.map((figure) => (
          <Card key={figure.id}>
            <CardHeader>
              <CardTitle>{figure.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-elegant-text">{figure.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

