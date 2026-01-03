import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <>
      <header>
        <Navbar />
        <Hero
          title={['About', 'Us']}
          description="Learn more about CrossBorder Tools and our mission."
        />
      </header>

      <main className="max-w-4xl mx-auto px-6 my-12">
        <article className="prose prose-lg">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            CrossBorder Tools is your go-to directory for discovering the best tools 
            and resources for cross-border e-commerce. We curate and review tools that 
            help sellers succeed in the global marketplace.
          </p>

          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Curated collection of 30+ essential e-commerce tools</li>
            <li>Honest reviews and feature comparisons</li>
            <li>Tools for product research, marketing, logistics, and more</li>
            <li>Regular updates with new tools and resources</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have a tool suggestion or feedback? We would love to hear from you!
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}
