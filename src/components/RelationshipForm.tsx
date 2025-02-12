"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type RelationshipData = {
  name: string
  gender: string
  type: string
  duration: string
  personalityTraits: string[]
  loveLanguages: string[]
  interests: string[]
  values: string[]
  communicationStyle: string
  lifeGoals: string
  stressResponses: string
  pastExperiences: string
  culturalBackground: string
  attachmentStyle: string
  isAdmireFigure: boolean
}

type RelationshipFormProps = {
  initialData?: RelationshipData
  onSubmit: (data: RelationshipData) => void
}

const personalityTraits = [
  "Introverted",
  "Extroverted",
  "Analytical",
  "Creative",
  "Organized",
  "Spontaneous",
  "Empathetic",
  "Logical",
  "Ambitious",
  "Laid-back",
]

const loveLanguages = ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"]

const attachmentStyles = ["Secure", "Anxious", "Avoidant", "Fearful-Avoidant"]

export function RelationshipForm({ initialData, onSubmit }: RelationshipFormProps) {
  const [formData, setFormData] = useState<RelationshipData>(
    initialData || {
      name: "",
      gender: "",
      type: "",
      duration: "",
      personalityTraits: [],
      loveLanguages: [],
      interests: [],
      values: [],
      communicationStyle: "",
      lifeGoals: "",
      stressResponses: "",
      pastExperiences: "",
      culturalBackground: "",
      attachmentStyle: "",
      isAdmireFigure: false,
    },
  )

  useEffect(() => {
    if (formData.type === "Romantic Partner") {
      setFormData((prev) => ({ ...prev, isAdmireFigure: false }))
    }
  }, [formData.type])

  const handleChange = (field: keyof RelationshipData, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Relationship Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Romantic Partner">Romantic Partner</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Colleague">Colleague</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Relationship Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g., 2 years, 6 months"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmireFigure"
                checked={formData.isAdmireFigure}
                onCheckedChange={(checked) => handleChange("isAdmireFigure", checked)}
                disabled={formData.type === "Romantic Partner"}
              />
              <Label
                htmlFor="isAdmireFigure"
                className={formData.type === "Romantic Partner" ? "text-muted-foreground" : ""}
              >
                Admire Figure
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You can only select 'Admire Figure' for non-romantic relationships.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>
          <TabsContent value="personality" className="space-y-4">
            <div className="space-y-2">
              <Label>Personality Traits (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {personalityTraits.map((trait) => (
                  <label key={trait} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.personalityTraits.includes(trait)}
                      onChange={(e) => {
                        const updatedTraits = e.target.checked
                          ? [...formData.personalityTraits, trait]
                          : formData.personalityTraits.filter((t) => t !== trait)
                        handleChange("personalityTraits", updatedTraits)
                      }}
                    />
                    <span>{trait}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Love Languages (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {loveLanguages.map((language) => (
                  <label key={language} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.loveLanguages.includes(language)}
                      onChange={(e) => {
                        const updatedLanguages = e.target.checked
                          ? [...formData.loveLanguages, language]
                          : formData.loveLanguages.filter((l) => l !== language)
                        handleChange("loveLanguages", updatedLanguages)
                      }}
                    />
                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests and Hobbies</Label>
              <Textarea
                id="interests"
                value={formData.interests.join(", ")}
                onChange={(e) => handleChange("interests", e.target.value.split(", "))}
                placeholder="e.g., reading, hiking, cooking"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="values">Values and Beliefs</Label>
              <Textarea
                id="values"
                value={formData.values.join(", ")}
                onChange={(e) => handleChange("values", e.target.value.split(", "))}
                placeholder="e.g., honesty, family, career growth"
              />
            </div>
          </TabsContent>
          <TabsContent value="communication" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="communicationStyle">Communication Style</Label>
              <Textarea
                id="communicationStyle"
                value={formData.communicationStyle}
                onChange={(e) => handleChange("communicationStyle", e.target.value)}
                placeholder="Describe how they typically communicate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifeGoals">Life Goals</Label>
              <Textarea
                id="lifeGoals"
                value={formData.lifeGoals}
                onChange={(e) => handleChange("lifeGoals", e.target.value)}
                placeholder="Describe their main life aspirations"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stressResponses">Stress Responses</Label>
              <Textarea
                id="stressResponses"
                value={formData.stressResponses}
                onChange={(e) => handleChange("stressResponses", e.target.value)}
                placeholder="Describe how they typically react under stress"
              />
            </div>
          </TabsContent>
          <TabsContent value="background" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pastExperiences">Past Relationship Experiences</Label>
              <Textarea
                id="pastExperiences"
                value={formData.pastExperiences}
                onChange={(e) => handleChange("pastExperiences", e.target.value)}
                placeholder="Briefly describe any significant past relationship experiences"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="culturalBackground">Cultural Background</Label>
              <Input
                id="culturalBackground"
                value={formData.culturalBackground}
                onChange={(e) => handleChange("culturalBackground", e.target.value)}
                placeholder="e.g., nationality, ethnicity, religious background"
              />
            </div>
            <div className="space-y-2">
              <Label>Attachment Style</Label>
              <RadioGroup
                value={formData.attachmentStyle}
                onValueChange={(value) => handleChange("attachmentStyle", value)}
              >
                {attachmentStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <RadioGroupItem value={style} id={style} />
                    <Label htmlFor={style}>{style}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}

