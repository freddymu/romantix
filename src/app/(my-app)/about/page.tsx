import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Sparkles } from "lucide-react"

const values = [
  { icon: Heart, title: "Empathy", description: "We approach every relationship with understanding and compassion." },
  { icon: Users, title: "Inclusivity", description: "We celebrate diversity in all forms of relationships and love." },
  { icon: Shield, title: "Privacy", description: "We prioritize the confidentiality and security of our users' data." },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We continuously evolve our AI to provide cutting-edge relationship insights.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-elegant-primary to-elegant-secondary py-20 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-elegant-light text-center">About Romantix</h1>
          <p className="mt-4 text-xl text-elegant-light/90 text-center max-w-2xl mx-auto">
            Empowering relationships through AI-driven insights and personalized guidance
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-elegant-secondary mb-4">Our Mission</h2>
          <p className="text-elegant-text mb-4">
            At Romantix, we're on a mission to help couples build stronger, more fulfilling relationships through the
            power of AI-driven insights and personalized guidance.
          </p>
          <p className="text-elegant-text">
            We believe that every relationship is unique, and with the right tools and understanding, love can flourish
            and grow stronger over time.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-elegant-secondary mb-8">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-start p-6">
                  <value.icon className="h-8 w-8 text-elegant-primary mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-elegant-primary mb-2">{value.title}</h3>
                    <p className="text-elegant-text">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-elegant-secondary mb-4">Our Story</h2>
          <p className="text-elegant-text mb-4">
            Romantix was born from a simple idea: what if we could harness the power of AI to help people navigate the
            complexities of love and relationships?
          </p>
          <p className="text-elegant-text mb-4">
            Founded by a team of relationship experts, data scientists, and hopeless romantics, we set out to create a
            platform that combines cutting-edge technology with timeless relationship wisdom.
          </p>
          <p className="text-elegant-text">
            Today, we're proud to have helped thousands of couples strengthen their bonds, overcome challenges, and
            rediscover the magic in their relationships.
          </p>
        </section>
      </div>
    </>
  )
}

