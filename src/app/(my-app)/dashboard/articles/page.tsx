import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ArticlesPage() {
  const articles = [
    { title: "5 Communication Tips for Couples", link: "/articles/communication-tips" },
    { title: "Building Trust in Your Relationship", link: "/articles/building-trust" },
    { title: "The Science of Love: What Happens in Your Brain", link: "/articles/science-of-love" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-elegant-primary mb-6">Recommended Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-elegant-primary">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={article.link}
                className="text-elegant-secondary hover:text-elegant-primary transition-colors duration-300"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

