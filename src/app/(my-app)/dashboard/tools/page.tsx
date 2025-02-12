import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ClipboardList, ShieldQuestion, ActivitySquare, Heart } from "lucide-react"

const tools = [
  { name: "Love Languages", icon: Heart, href: "/dashboard/tools/love-languages" },
  { name: "Attachment Styles", icon: ClipboardList, href: "/dashboard/tools/attachment-styles" },
  { name: "Conflict Resolution", icon: ShieldQuestion, href: "/dashboard/tools/conflict-resolution" },
  { name: "Health Assessment", icon: ActivitySquare, href: "/dashboard/tools/health-assessment" },
]

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-elegant-primary mb-6">Relationship Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.name} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <tool.icon className="h-6 w-6 text-elegant-secondary" />
                <span>{tool.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={tool.href}>Go to Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

