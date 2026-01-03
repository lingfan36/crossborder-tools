import { getAllCourses } from '@/services/courses'
import { posts } from '@/appData/courses'
import { Faqs } from '@/appData/faqs'
import Faq from '@/components/faq'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Newsletter from '@/components/newsletter'
import ProductList from '@/components/product-list'
import SectionHeading from '@/components/section-heading'

export default async function Home() {
  const courses = await getAllCourses()

  return (
    <>
      <header>
        <Navbar />
        <Hero
          title={['Cross-Border', 'E-commerce Tools']}
          description="Curated collection of essential tools for global sellers. From product research and logistics tracking to payment solutions and marketing — everything you need to scale your international business."
        />
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-3 my-12">
          <SectionHeading
            title={['Featured', 'Tools']}
            subtitle="We've handpicked the most effective cross-border e-commerce tools to help you boost efficiency, reduce costs, and expand globally."
          />
          <ProductList products={courses} />
        </section>

        <Faq items={Faqs} />
        <Newsletter />
      </main>

      <Footer />
    </>
  )
}
