"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Edit, Trash2, Heart, MessageCircle, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RelationshipForm, type RelationshipData } from "@/components/RelationshipForm"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

type Relationship = RelationshipData & { id: number }

export default function RelationshipPage() {
  const [relationships, setRelationships] = useState<Relationship[]>([
    {
      id: 1,
      name: "Sarah",
      type: "Romantic Partner",
      duration: "2 years",
      personalityTraits: ["Extroverted", "Creative"],
      loveLanguages: ["Quality Time", "Physical Touch"],
      interests: ["hiking", "photography"],
      values: ["honesty", "adventure"],
      communicationStyle: "Open and direct",
      lifeGoals: "Start a family, travel the world",
      stressResponses: "Needs alone time to recharge",
      pastExperiences: "One long-term relationship before",
      culturalBackground: "American, Christian upbringing",
      attachmentStyle: "Secure",
      isAdmireFigure: false,
      gender: "Female",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRelationship, setEditingRelationship] = useState<Relationship | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [viewingRelationship, setViewingRelationship] = useState<Relationship | null>(null)

  const addRelationship = (data: RelationshipData) => {
    setRelationships([...relationships, { id: relationships.length + 1, ...data }])
    setIsAddDialogOpen(false)
  }

  const updateRelationship = (data: RelationshipData) => {
    if (editingRelationship) {
      setRelationships(relationships.map((rel) => (rel.id === editingRelationship.id ? { ...rel, ...data } : rel)))
      setEditingRelationship(null)
    }
  }

  const removeRelationship = (id: number) => {
    setRelationships((prevRelationships) => prevRelationships.filter((rel) => rel.id !== id))
  }

  const handleFilterChange = (type: string) => {
    setActiveFilter(activeFilter === type ? null : type)
  }

  const filteredRelationships = relationships.filter(
    (rel) =>
      (rel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rel.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!activeFilter || rel.type === activeFilter),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-elegant-primary">Relationships</h1>
        <Button
          size="lg"
          className="bg-elegant-secondary hover:bg-elegant-secondary/90"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle className="h-5 w-5" /> Add Relationship
        </Button>
      </div>

      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10 pr-4 h-11"
          placeholder="Search relationships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from(new Set(relationships.map((rel) => rel.type))).map((type) => (
          <Badge
            key={type}
            variant={activeFilter === type ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange(type)}
          >
            {type}
          </Badge>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden h-[400px] flex flex-col">
                <CardHeader className="space-y-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRelationships.map((relationship) => (
              <Card key={relationship.id} className="overflow-hidden h-[360px] flex flex-col">
                <CardHeader className="py-2 px-4 h-[80px] flex items-center justify-start">
                  <CardTitle className="text-xl font-semibold line-clamp-2 overflow-hidden text-ellipsis text-left flex items-center gap-2">
                    {relationship.name}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-4 flex-grow overflow-auto">
                  <div className="grid grid-cols-[120px,1fr] gap-y-3 text-sm">
                    {relationship.type && (
                      <>
                        <div className="font-medium">Type</div>
                        <div className="text-muted-foreground">{relationship.type}</div>
                      </>
                    )}
                    {relationship.gender && (
                      <>
                        <div className="font-medium">Gender</div>
                        <div className="text-muted-foreground">{relationship.gender}</div>
                      </>
                    )}

                    {relationship.duration && (
                      <>
                        <div className="font-medium">Duration</div>
                        <div className="text-muted-foreground">{relationship.duration}</div>
                      </>
                    )}

                    {relationship.personalityTraits?.length > 0 && (
                      <>
                        <div className="font-medium">Personality</div>
                        <div className="text-muted-foreground">{relationship.personalityTraits.join(", ")}</div>
                      </>
                    )}

                    {relationship.loveLanguages?.length > 0 && (
                      <>
                        <div className="font-medium">Love Languages</div>
                        <div className="text-muted-foreground">{relationship.loveLanguages.join(", ")}</div>
                      </>
                    )}
                  </div>
                </CardContent>
                <Separator />
                <div className="p-2 bg-muted/5 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {relationship.type === "Romantic Partner" && (
                      <>
                        <Heart className="h-5 w-5 text-red-500" />
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => console.log(`Start consultation for ${relationship.name}`)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Consult
                        </Button>
                      </>
                    )}
                    {/* {relationship.isAdmireFigure && <Star className="h-5 w-5 text-yellow-500" />} */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setEditingRelationship(relationship)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit relationship</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewingRelationship(relationship)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Relationship</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete your relationship with {relationship.name}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeRelationship(relationship.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipProvider>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </AnimatePresence>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Relationship</DialogTitle>
          </DialogHeader>
          <RelationshipForm onSubmit={addRelationship} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRelationship} onOpenChange={() => setEditingRelationship(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Relationship</DialogTitle>
          </DialogHeader>
          {editingRelationship && <RelationshipForm initialData={editingRelationship} onSubmit={updateRelationship} />}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingRelationship} onOpenChange={() => setViewingRelationship(null)}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Relationship Details</DialogTitle>
          </DialogHeader>
          {viewingRelationship && (
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-6">
              <div className="space-y-4">
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Name:</span>
                  <span>{viewingRelationship.name}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Type:</span>
                  <span>{viewingRelationship.type}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Gender:</span>
                  <span>{viewingRelationship.gender}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Duration:</span>
                  <span>{viewingRelationship.duration}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Personality:</span>
                  <span>{viewingRelationship.personalityTraits.join(", ")}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Love Languages:</span>
                  <span>{viewingRelationship.loveLanguages.join(", ")}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Interests:</span>
                  <span>{viewingRelationship.interests.join(", ")}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Values:</span>
                  <span>{viewingRelationship.values.join(", ")}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Communication:</span>
                  <span>{viewingRelationship.communicationStyle}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Life Goals:</span>
                  <span>{viewingRelationship.lifeGoals}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Stress Responses:</span>
                  <span>{viewingRelationship.stressResponses}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Past Experiences:</span>
                  <span>{viewingRelationship.pastExperiences}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Cultural Background:</span>
                  <span>{viewingRelationship.culturalBackground}</span>
                </div>
                <div className="grid grid-cols-[120px,1fr] items-start gap-4">
                  <span className="font-medium">Attachment Style:</span>
                  <span>{viewingRelationship.attachmentStyle}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

