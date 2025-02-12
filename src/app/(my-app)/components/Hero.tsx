'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    yourName: '',
    partnerName: '',
    yourAge: '',
    partnerAge: '',
    struggle: '',
    admire: '',
  })

  const questions = [
    { key: 'yourName', question: "What's your name?", type: 'input' },
    { key: 'partnerName', question: "And your partner's name?", type: 'input' },
    { key: 'yourCulture', question: "What's your culture or nationality?", type: 'input' },
    {
      key: 'partnerCulture',
      question: "And your partner's culture or nationality?",
      type: 'input',
    },
    { key: 'yourAge', question: 'How old are you?', type: 'input', inputType: 'number' },
    { key: 'partnerAge', question: "And your partner's age?", type: 'input', inputType: 'number' },
    {
      key: 'struggle',
      question: "What's your biggest relationship struggle?",
      type: 'select',
      options: [
        { value: 'communication', label: 'Communication' },
        { value: 'trust', label: 'Trust' },
        { value: 'intimacy', label: 'Intimacy' },
      ],
    },
    {
      key: 'admire',
      question: 'Who do you admire most?',
      type: 'select',
      options: [
        { value: 'partner', label: 'My Partner' },
        { value: 'friend', label: 'A Friend' },
        { value: 'celebrity', label: 'A Celebrity' },
      ],
    },
  ]

  const handleChange = (value: string) => {
    setFormData({ ...formData, [questions[step].key]: value })
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      console.log(formData)
      // Here you would typically send the data to your backend
    }
  }

  const currentQuestion = questions[step]

  return (
    <section className="w-full py-20 md:py-32 lg:py-48 bg-elegant-light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-elegant-primary/10 to-elegant-accent/10"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-elegant-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Elevate Your Love Story
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-elegant-text mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover profound insights and nurture your relationship with our AI-powered platform.
          </motion.p>
          <motion.div
            className="w-full max-w-md space-y-4 bg-elegant-light p-8 rounded-lg shadow-lg border border-elegant-primary/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif mb-4 text-elegant-primary">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.type === 'input' && (
                  <Input
                    type={currentQuestion.inputType ?? 'text'}
                    placeholder="Type your answer here"
                    value={formData[currentQuestion.key as keyof typeof formData]}
                    onChange={(e) => handleChange(e.target.value)}
                    className="border-elegant-primary/20 focus:ring-elegant-accent mb-4"
                    aria-label={currentQuestion.question}
                  />
                )}
                {currentQuestion.type === 'select' && (
                  <Select onValueChange={handleChange}>
                    <SelectTrigger className="border-elegant-primary/20 mb-4">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentQuestion.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button
                  onClick={handleNext}
                  className="w-full bg-elegant-secondary text-elegant-light hover:bg-elegant-secondary/90"
                  aria-label={
                    step < questions.length - 1 ? 'Next question' : 'Get your love insights'
                  }
                >
                  {step < questions.length - 1 ? 'Next' : 'Get Your Love Insights'}
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
