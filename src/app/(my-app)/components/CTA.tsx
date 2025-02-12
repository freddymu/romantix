'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-br from-elegant-primary via-elegant-accent to-elegant-secondary overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yIDJsMi0ybDItMmgtNHYyeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      <div className="container relative px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-elegant-light/10 rounded-full mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-6 h-6 text-elegant-light" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-elegant-light">
            Your love story deserves to be extraordinary.
          </h2>
          <p className="max-w-[600px] text-elegant-light/95 md:text-xl">
            Start your journey to a deeper, more fulfilling relationship today.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-elegant-light text-elegant-primary hover:bg-elegant-light/90 hover:text-elegant-secondary transition-colors duration-300 mt-6 text-lg px-6 py-3 h-auto font-medium shadow-lg flex items-center space-x-2"
            >
              <span>Begin Your Love Adventure</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
