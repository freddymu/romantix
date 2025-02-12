import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, TrendingUp, Calendar, GraduationCap, Wrench } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary mb-6">Welcome, John</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Relationship Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={75} className="w-full mb-2" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-sm text-muted-foreground">Current Score: 75/100</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/assessment">View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Relationships</CardTitle>
            <Heart className="h-4 w-4 text-elegant-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <Link href="/dashboard/relationships" className="text-sm text-elegant-secondary hover:underline">
              View all relationships
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Consultations</CardTitle>
            <TrendingUp className="h-4 w-4 text-elegant-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <Link href="/dashboard/consultations" className="text-sm text-elegant-secondary hover:underline">
              View all consultations
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Milestones</CardTitle>
            <Calendar className="h-4 w-4 text-elegant-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">Anniversary in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <GraduationCap className="h-4 w-4 text-elegant-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Modules in progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button className="w-full" asChild>
            <Link href="/dashboard/consultations">Start New Consultation</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/journal">Write in Journal</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/learning">Continue Learning</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/quizzes">Take a Quiz</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/date-ideas">Generate Date Idea</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/milestones">Add Milestone</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/tools">
              <Wrench className="mr-2 h-4 w-4" />
              Relationship Tools
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

