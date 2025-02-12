'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah T.',
      role: 'Early Beta User',
      content:
        "Romantix.quest helped me understand my partner in ways I couldn't before. The insights were spot on!",
      avatar: '/avatar1.png',
    },
    {
      name: 'John D.',
      role: 'Married for 5 years',
      content: 'This platform reignited the spark in our marriage. Highly recommended!',
      avatar: '/avatar2.png',
    },
    {
      name: 'Emily R.',
      role: 'Dating',
      content: 'The personalized advice has been a game-changer for my new relationship.',
      avatar: '/avatar3.png',
    },
    {
      name: 'Michael S.',
      role: 'Long-term relationship',
      content:
        'I was skeptical at first, but the results speak for themselves. Our communication has improved tremendously.',
      avatar: '/avatar4.png',
    },
    {
      name: 'Lisa M.',
      role: 'Newlywed',
      content:
        "Romantix.quest has been like having a relationship coach in our pocket. It's amazing!",
      avatar: '/avatar5.png',
    },
    {
      name: 'David K.',
      role: 'Engaged',
      content:
        "This platform helped us address issues we didn't even know we had. We feel more prepared for marriage now.",
      avatar: '/avatar6.png',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 3))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? testimonials.length - 3 : prevIndex - 3))
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-elegant-light overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-elegant-light text-elegant-primary hover:bg-elegant-secondary hover:text-elegant-light"
            onClick={prevTestimonial}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="flex gap-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
                  <Card
                    key={index}
                    className="flex-shrink-0 w-full md:w-1/3 bg-elegant-background border-elegant-secondary"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-elegant-primary">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-elegant-text">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-elegant-text italic">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-elegant-light text-elegant-primary hover:bg-elegant-secondary hover:text-elegant-light"
            onClick={nextTestimonial}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
