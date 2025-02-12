"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for romantic partners
const romanticPartners = [
  { id: 1, name: "Sarah" },
  { id: 2, name: "John" },
  { id: 3, name: "Emily" },
]

// Mock data for consultations
const mockConsultations = [
  {
    id: 1,
    partnerName: "Sarah",
    subject: "Communication Issues",
    description: "We've been having trouble expressing our needs clearly.",
    status: "Completed",
  },
  {
    id: 2,
    partnerName: "John",
    subject: "Trust Building",
    description: "Working on rebuilding trust after a difficult period.",
    status: "In Progress",
  },
  {
    id: 3,
    partnerName: "Emily",
    subject: "Conflict Resolution",
    description: "Learning healthier ways to handle disagreements.",
    status: "Waiting",
  },
]

export default function ConsultationForm() {
  const params = useParams()
  const router = useRouter()
  const [partnerName, setPartnerName] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Waiting")

  useEffect(() => {
    if (params.id !== "new") {
      const consultation = mockConsultations.find((c) => c.id === Number(params.id))
      if (consultation) {
        setPartnerName(consultation.partnerName)
        setSubject(consultation.subject)
        setDescription(consultation.description)
        setStatus(consultation.status)
      }
    }
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to API)
    console.log({ partnerName, subject, description, status })
    router.push("/dashboard/consultations")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary">
        {params.id === "new" ? "New Consultation" : "Consultation Details"}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>{params.id === "new" ? "Create New Consultation" : "View/Edit Consultation"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner">Partner</Label>
              <Select value={partnerName} onValueChange={setPartnerName} disabled={params.id !== "new"}>
                <SelectTrigger id="partner">
                  <SelectValue placeholder="Select a partner" />
                </SelectTrigger>
                <SelectContent>
                  {romanticPartners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.name}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter consultation subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened (max 500 characters)"
                maxLength={500}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">{description.length}/500 characters</p>
            </div>
            {params.id !== "new" && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Waiting">Waiting</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/consultations")}>
                Cancel
              </Button>
              <Button type="submit">{params.id === "new" ? "Create Consultation" : "Update Consultation"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

