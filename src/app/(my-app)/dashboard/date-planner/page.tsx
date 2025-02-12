"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatePlannerPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Notification sign-up for:", email)
    // For now, we'll just clear the input
    setEmail("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-elegant-primary mb-6">AI Date Planner</h1>
        <p className="text-xl text-elegant-text mb-8">
          Coming soon: Personalized date plans tailored just for you and your partner!
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-elegant-secondary" />
                AI-Powered Date Planning
              </CardTitle>
              <CardDescription>
                Our AI will create the perfect date plan based on your preferences and relationship dynamics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Personalized date ideas tailored to your interests</li>
                <li>Consideration of your relationship stage and goals</li>
                <li>Suggestions for activities, restaurants, and experiences</li>
                <li>Customizable options for budget and time constraints</li>
                <li>Integration with local events and seasonal activities</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Preview: Plan Your Perfect Date</CardTitle>
              <CardDescription>Here's a sneak peek at how you'll be able to customize your date plans.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-type">Date Type</Label>
                  <Select disabled>
                    <SelectTrigger id="date-type">
                      <SelectValue placeholder="Select date type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="adventurous">Adventurous</SelectItem>
                      <SelectItem value="relaxing">Relaxing</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Select disabled>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">$</SelectItem>
                      <SelectItem value="medium">$$</SelectItem>
                      <SelectItem value="high">$$$</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter your city" disabled />
                </div>
                <Button className="w-full" disabled>
                  Generate Date Plan
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              This feature is coming soon. Sign up for notifications to be the first to know when it's available!
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Sign up to be notified when our AI Date Planner becomes available.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Notify Me</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

