import type React from "react"
import { Sidebar } from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-elegant-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8 md:ml-64">{children}</main>
    </div>
  )
}

