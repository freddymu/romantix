'use client'
import { ClipboardList, Zap, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Input Your Details',
      description: 'Provide a few basic details about your relationship.',
    },
    {
      icon: Zap,
      title: 'Get Instant Feedback',
      description: 'Our AI processes the details to provide personalized insights.',
    },
    {
      icon: Heart,
      title: 'Build Your Connection',
      description: 'Use actionable tips to grow and strengthen your bond.',
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-elegant-background-dark text-elegant-light">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-elegant-light rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <step.icon className="h-12 w-12 mb-4 text-elegant-secondary" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2 text-elegant-primary">{step.title}</h3>
              <p className="text-elegant-text">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
