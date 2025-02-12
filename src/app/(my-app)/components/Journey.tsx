'use client'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

export default function Journey() {
  const steps = [
    {
      title: 'Connect',
      description:
        'Begin your journey by deepening your connection with your partner through guided exercises and conversations.',
    },
    {
      title: 'Discover',
      description:
        'Uncover insights about your relationship dynamics using our AI-powered analysis tools.',
    },
    {
      title: 'Grow',
      description:
        'Learn and implement personalized strategies to strengthen your bond and overcome challenges.',
    },
    {
      title: 'Thrive',
      description:
        'Enjoy a more fulfilling and harmonious relationship as you continue to nurture and celebrate your love.',
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-elegant-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif">
          Your Relationship Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-elegant-secondary flex items-center justify-center text-elegant-light text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-elegant-primary">{step.title}</h3>
                  <p className="text-elegant-text">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
