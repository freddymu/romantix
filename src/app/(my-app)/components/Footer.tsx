import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gradient-to-b from-elegant-primary to-elegant-primary/95 text-elegant-light">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 border-b border-elegant-light/20 pb-2">About</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Team
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 border-b border-elegant-light/20 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Relationship Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 border-b border-elegant-light/20 pb-2">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 border-b border-elegant-light/20 pb-2">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-elegant-secondary transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">•</span> Contact Us
                </Link>
              </li>
              <li className="flex space-x-4">
                <a
                  href="https://twitter.com/romantixquest"
                  className="hover:text-elegant-secondary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://facebook.com/romantixquest"
                  className="hover:text-elegant-secondary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com/romantixquest"
                  className="hover:text-elegant-secondary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-elegant-light/20 text-center">
          <p className="text-elegant-light/80">
            &copy; {new Date().getFullYear()} Romantix.quest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

