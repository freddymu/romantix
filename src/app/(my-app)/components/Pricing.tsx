'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'AI-powered relationship assessment',
        'Basic relationship insights',
        'Access to educational articles',
        'Weekly relationship tips',
        'Community forum access',
      ],
      ctaLabel: 'Choose Plan',
      ctaLink: '/register',
    },
    {
      name: 'Basic',
      price: '$9.99',
      popular: true,
      features: [
        'All Free features',
        'Personalized AI relationship coach',
        'Detailed relationship analysis',
        'Guided improvement exercises',
        'Priority support response',
        'Relationship progress tracking',
      ],
      ctaLabel: 'Choose Plan',
      ctaLink: '/register',
    },
    {
      name: 'Couples',
      price: '$14.99',
      features: [
        'All Basic features',
        'Joint account access',
        'Couples assessment tools',
        'Customized growth roadmap',
        'Weekly check-in reminders',
        '24/7 priority support',
        'Relationship milestone tracking',
      ],
      ctaLabel: 'Stay Tuned',
      ctaLink: '#',
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-elegant-background-alt">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl tracking-tighter sm:text-5xl text-center mb-12 text-elegant-primary font-serif"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`flex flex-col justify-between h-full bg-elegant-light hover:shadow-lg transition-shadow duration-300 ${plan.popular ? 'border-2 border-elegant-secondary' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-elegant-primary text-2xl">{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge className="bg-elegant-secondary text-elegant-light px-2 py-1">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-2xl font-bold text-elegant-secondary">
                    {plan.price}
                    <span className="text-sm font-normal text-elegant-text">/month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className={`w-5 h-5 mr-3 ${plan.popular ? 'text-elegant-secondary' : 'text-elegant-primary'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className={`text-elegant-text ${plan.popular ? 'font-medium' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button
                    className={`w-full py-6 text-lg font-semibold transition-colors duration-300 ${
                      plan.popular
                        ? 'bg-elegant-secondary text-elegant-light hover:bg-elegant-secondary/90'
                        : 'bg-elegant-primary text-elegant-light hover:bg-elegant-primary/90'
                    }`}
                  >
                    <Link href={plan.ctaLink}>{plan.ctaLabel}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
