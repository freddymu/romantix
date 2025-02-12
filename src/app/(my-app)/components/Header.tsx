'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { Pacifico } from 'next/font/google'

// const pacifico = Pacifico({ subsets: ['latin'], weight: '400' })

export default function Header() {
  const [language, setLanguage] = useState<'en' | 'id'>('en')

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en')
  }

  return (
    <header className="w-full py-4 bg-elegant-light shadow-sm sticky top-0 z-50">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className={`text-2xl text-elegant-primary font-logoText`}>
            Romantix
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="/about"
              className="text-elegant-text hover:text-elegant-secondary transition-colors"
            >
              {language === 'en' ? 'About Us' : 'Tentang Kami'}
            </Link>
            <Link
              href="/articles"
              className="text-elegant-text hover:text-elegant-secondary transition-colors"
            >
              {language === 'en' ? 'Articles' : 'Artikel'}
            </Link>
            <Link
              href="/#pricing"
              className="text-elegant-text hover:text-elegant-secondary transition-colors"
            >
              {language === 'en' ? 'Pricing' : 'Harga'}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('id')}>
                  Bahasa Indonesia
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              asChild
              variant="outline"
              className="bg-elegant-secondary text-elegant-light hover:bg-elegant-secondary/90"
            >
              <Link href="/register">{language === 'en' ? 'Sign Up' : 'Daftar'}</Link>
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('id')}>
                Bahasa Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
