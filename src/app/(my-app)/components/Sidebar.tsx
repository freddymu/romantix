import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pacifico } from 'next/font/google'
import { Home, FileText, Settings, LogOut, Heart } from 'lucide-react'

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' })

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Heart, label: 'Relationship', href: '/dashboard/relationship' },
  { icon: FileText, label: 'Articles', href: '/dashboard/articles' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-elegant-primary text-elegant-light">
      <div className="px-6 py-4 border-b border-elegant-light/20">
        <Link href="/dashboard" className={`text-2xl font-bold ${pacifico.className}`}>
          Romantix
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-elegant-secondary transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-elegant-light/20">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-elegant-light/70">john@example.com</p>
          </div>
        </div>
        <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}
