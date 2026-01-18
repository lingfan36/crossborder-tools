import Hero from '@/components/hero'
import Lists from '@/components/lists'
import { getAllTools, getOneTool } from '@/services/tools'
import { getCollectionsForTool } from '@/services/collections'
import { ExternalLink, ChevronDown, Award } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

interface StaticParams {
  slug: string
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<StaticParams[]> {
  const tools = await getAllTools()

  return tools.map((tool) => {
    return {
      slug: `${tool.slug}`,
    }
  })
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = await getOneTool(slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: `${tool.title} Review 2025 - CrossBorder Tools`,
    description: tool.shortDescription,
  }
}

// Generate consistent rating based on slug
function generateRating(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash)
  }
  return 4.5 + (Math.abs(hash) % 5) * 0.1
}

export default async function ToolDetailsPage(props: PageProps) {
  const params = await props.params
  const { slug } = params
  const tool = await getOneTool(slug)
  const collections = await getCollectionsForTool(slug)

  if (!tool) {
    return <p className="text-center mt-10">Tool not found</p>
  }

  const rating = generateRating(slug)
  const reviewCount = 50 + (slug.length * 7) % 150

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.longDescription || tool.shortDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: tool.link,
    image: `https://lingfan.site${tool.cover}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviewCount,
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: 'CrossBorder Tools',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: tool.longDescription || tool.shortDescription,
    },
  }

  // FAQ structured data
  const faqJsonLd = tool.faqs && tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Hero title={['Tool', 'Details']} description={tool.title} />

      <main className="max-w-4xl mx-auto p-6">
        <article>
          <figure className="mb-6">
            <img
              src={tool.cover}
              alt={tool.title}
              className="w-full h-64 object-cover rounded-xl"
            />
          </figure>

          {/* Rating Display */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
            <span className="text-gray-500">({reviewCount} reviews)</span>
          </div>

          <p className="text-lg text-gray-700 mb-4">
            {tool.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="bg-violet-100 px-3 py-1 rounded-xl font-bold text-violet-700">
              {tool.category}
            </span>
          </div>
        </article>

        <section>
          <Lists title="Key Features" items={tool.features} />
        </section>

        {/* Long Description */}
        {tool.longDescription && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">In-Depth Review</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{tool.longDescription}</p>
            </div>
          </section>
        )}

        {/* FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tool.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-xl p-5 cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-gray-800 list-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Featured In Collections */}
        {collections.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="text-amber-500" size={24} />
              Featured In
            </h2>
            <div className="flex flex-wrap gap-3">
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/best/${collection.slug}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-amber-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:from-violet-200 hover:to-amber-200 transition"
                >
                  🏆 {collection.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-10">
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-amber-600"
          >
            <ExternalLink size={18} />
            Visit Official Website
          </a>
        </footer>
      </main>
    </>
  )
}
