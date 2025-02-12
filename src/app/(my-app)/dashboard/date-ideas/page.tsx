"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Sparkles, Heart } from "lucide-react"

type DateIdea = {
  title: string
  description: string
  category: string
  budget: number
  indoor: boolean
}

const mockDateIdeas: DateIdea[] = [
  {
    title: "Romantic Picnic in the Park",
    description:
      "Pack a basket with your favorite snacks and drinks, bring a cozy blanket, and enjoy a relaxing afternoon in a beautiful park setting.",
    category: "Outdoor",
    budget: 30,
    indoor: false,
  },
  {
    title: "Couples Cooking Class",
    description:
      "Learn to cook a new cuisine together in a fun and interactive cooking class. Enjoy the fruits of your labor afterward!",
    category: "Food & Drink",
    budget: 100,
    indoor: true,
  },
  {
    title: "Stargazing Night",
    description:
      "Drive to a dark sky area, bring some hot cocoa, and spend the evening identifying constellations and watching for shooting stars.",
    category: "Outdoor",
    budget: 20,
    indoor: false,
  },
  {
    title: "Museum Exploration",
    description:
      "Visit a local museum and discover new exhibits together. Many museums offer special date night events with music and refreshments.",
    category: "Cultural",
    budget: 50,
    indoor: true,
  },
  {
    title: "Couples Spa Day",
    description: "Indulge in a relaxing spa day together with massages, facials, and other pampering treatments.",
    category: "Wellness",
    budget: 200,
    indoor: true,
  },
]

export default function DateIdeasPage() {
  const [category, setCategory] = useState<string>("")
  const [budget, setBudget] = useState<number>(100)
  const [indoor, setIndoor] = useState<boolean>(false)
  const [generatedIdea, setGeneratedIdea] = useState<DateIdea | null>(null)

  const generateDateIdea = () => {
    // In a real application, this would call an API to generate a date idea
    // For now, we'll just randomly select one from our mock data
    const filteredIdeas = mockDateIdeas.filter(
      (idea) => (category === "" || idea.category === category) && idea.budget <= budget && indoor === idea.indoor,
    )

    if (filteredIdeas.length > 0) {
      const randomIdea = filteredIdeas[Math.floor(Math.random() * filteredIdeas.length)]
      setGeneratedIdea(randomIdea)
    } else {
      setGeneratedIdea(null)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">Date Idea Generator</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate Your Perfect Date</CardTitle>
          <CardDescription>Customize your preferences to get a tailored date idea.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Outdoor">Outdoor</SelectItem>
                <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Wellness">Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (up to ${budget})</Label>
            <Slider
              id="budget"
              min={20}
              max={200}
              step={10}
              value={[budget]}
              onValueChange={(value) => setBudget(value[0])}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="indoor" checked={indoor} onCheckedChange={setIndoor} />
            <Label htmlFor="indoor">Indoor Only</Label>
          </div>

          <Button onClick={generateDateIdea} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" /> Generate Date Idea
          </Button>
        </CardContent>
      </Card>

      {generatedIdea && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-elegant-secondary" />
              {generatedIdea.title}
            </CardTitle>
            <CardDescription>
              {generatedIdea.category} • ${generatedIdea.budget} • {generatedIdea.indoor ? "Indoor" : "Outdoor"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{generatedIdea.description}</p>
          </CardContent>
        </Card>
      )}

      {generatedIdea === null && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No date ideas found matching your criteria. Try adjusting your preferences.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

