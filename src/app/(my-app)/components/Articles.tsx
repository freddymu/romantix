'use client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Articles() {
  const articles = [
    { title: '5 Communication Tips for Couples', link: '/articles/communication-tips' },
    { title: 'Building Trust in Your Relationship', link: '/articles/building-trust' },
    { title: 'The Science of Love: What Happens in Your Brain', link: '/articles/science-of-love' },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-elegant-background">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-elegant-light hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-elegant-primary">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={article.link}
                    className="text-elegant-secondary hover:text-elegant-primary transition-colors duration-300"
                  >
                    Read more
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
