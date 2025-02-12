import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Articles from './components/Articles'
import Pricing from './components/Pricing'
import Journey from './components/Journey'
import CTA from './components/CTA'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Journey />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Articles />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
