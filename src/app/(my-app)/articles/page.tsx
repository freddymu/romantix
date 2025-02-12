import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const articles = [
  {
    slug: "5-communication-tips-for-couples",
    title: "5 Communication Tips for Couples",
    excerpt: "Improve your relationship with these essential communication strategies.",
    date: "2023-06-15",
  },
  {
    slug: "building-trust-in-your-relationship",
    title: "Building Trust in Your Relationship",
    excerpt: "Learn how to establish and maintain trust with your partner.",
    date: "2023-07-02",
  },
  {
    slug: "the-science-of-love-what-happens-in-your-brain",
    title: "The Science of Love: What Happens in Your Brain",
    excerpt: "Discover the fascinating neurological processes behind falling in love.",
    date: "2023-07-20",
  },
]

export default function ArticlesPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-elegant-primary to-elegant-secondary py-20 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-elegant-light text-center">
            Relationship Articles
          </h1>
          <p className="mt-4 text-xl text-elegant-light/90 text-center max-w-2xl mx-auto">
            Explore our collection of insightful articles to enhance your relationship
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-elegant-primary">
                  <Link href={`/articles/${article.slug}`} className="hover:text-elegant-secondary transition-colors">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-elegant-text mb-4">{article.excerpt}</p>
                <div className="text-sm text-elegant-text/70">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

