"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pacifico } from "next/font/google"
import { Home, Heart, MessageSquare, Settings, LogOut, Calendar, Sparkles, Menu, Wrench } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" })

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Heart, label: "Relationships", href: "/dashboard/relationship" },
  { icon: MessageSquare, label: "Consultations", href: "/dashboard/consultations" },
  // { icon: BookOpen, label: "Journal", href: "/dashboard/journal" },
  { icon: Calendar, label: "Milestones", href: "/dashboard/milestones" },
  // { icon: GraduationCap, label: "Learning", href: "/dashboard/learning" },
  // { icon: ClipboardList, label: "Quizzes", href: "/dashboard/quizzes" },
  // { icon: Sparkles, label: "Date Ideas", href: "/dashboard/date-ideas" },
  { icon: Sparkles, label: "Date Planner", href: "/dashboard/date-planner" },
  { icon: Wrench, label: "Tools", href: "/dashboard/tools" },
  // { icon: ShieldQuestion, label: "Conflict Resolution", href: "/dashboard/tools/conflict-resolution" },
  // { icon: ActivitySquare, label: "Health Assessment", href: "/dashboard/assessment" },
  // { icon: Users, label: "Community", href: "/dashboard/community" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  // { icon: MessageCircle, label: "Communication Log", href: "/dashboard/communication-log" },
  // { icon: Target, label: "Relationship Goals", href: "/dashboard/goals" },
  // { icon: TrendingUp, label: "Progress Tracking", href: "/dashboard/progress" },
  // { icon: CalendarIcon, label: "Shared Calendar", href: "/dashboard/shared-calendar" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-4">
        <Link href="/dashboard" className={`text-2xl font-bold ${pacifico.className}`}>
          Romantix
        </Link>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-elegant-secondary text-elegant-light"
                    : "text-elegant-light hover:bg-elegant-secondary/20"
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-2 border-t border-elegant-light/20">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-elegant-light/70 truncate">john@example.com</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-elegant-light/90 hover:text-elegant-light hover:bg-elegant-secondary/20"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-elegant-primary text-elegant-light w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-elegant-primary text-elegant-light">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}

