'use client'
import { MessageCircle, Rocket, Globe, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Relationship Insights',
      description: 'Get clear feedback on your relationship dynamics.',
    },
    {
      icon: Rocket,
      title: 'Personalized Advice',
      description: 'Tailored responses based on your challenges.',
    },
    {
      icon: Globe,
      title: 'Culturally Sensitive',
      description: 'Takes into account culture and individuality.',
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'We ensure your information is 100% private.',
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-elegant-background-alt">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif">
          Key Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-elegant-light rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="h-12 w-12 mb-4 text-elegant-secondary" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2 text-elegant-primary">{feature.title}</h3>
              <p className="text-elegant-text">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
