import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const articles = [
  {
    slug: "5-communication-tips-for-couples",
    title: "5 Communication Tips for Couples",
    content:
      "Communication is key in any relationship. Here are five tips to improve your communication with your partner: 1. Listen actively, 2. Use 'I' statements, 3. Avoid criticism, 4. Show appreciation, 5. Set aside time for meaningful conversations.",
    author: "Dr. Emily Johnson",
    date: "2023-06-15",
  },
  {
    slug: "building-trust-in-your-relationship",
    title: "Building Trust in Your Relationship",
    content:
      "Trust is the foundation of a strong relationship. To build trust, be reliable, keep your promises, be honest, respect boundaries, and show vulnerability. Remember, trust takes time to build but can be quickly broken.",
    author: "Mark Thompson",
    date: "2023-07-02",
  },
  {
    slug: "the-science-of-love-what-happens-in-your-brain",
    title: "The Science of Love: What Happens in Your Brain",
    content:
      "When you fall in love, your brain releases a cocktail of chemicals including dopamine, norepinephrine, and serotonin. These chemicals are responsible for the euphoric feeling associated with new love and play a crucial role in bonding and attachment.",
    author: "Dr. Sarah Lee",
    date: "2023-07-20",
  },
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((article) => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <section className="bg-gradient-to-r from-elegant-primary to-elegant-secondary py-20 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-elegant-light text-center">
            {article.title}
          </h1>
          <div className="mt-4 text-xl text-elegant-light/90 text-center">
            <span className="font-medium">{article.author}</span> •{" "}
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/articles"
          className="inline-flex items-center text-elegant-secondary hover:text-elegant-primary transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
        <div className="prose prose-elegant max-w-none">
          <p>{article.content}</p>
        </div>
        <div className="mt-12">
          <Button asChild>
            <Link href="/articles">Read More Articles</Link>
          </Button>
        </div>
      </article>
    </>
  )
}

