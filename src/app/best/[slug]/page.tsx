import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getAllCollections, getCollectionWithTools } from '@/services/collections'
import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Trophy, Star, CheckCircle, Compass } from 'lucide-react'

interface StaticParams {
  slug: string
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<StaticParams[]> {
  const collections = await getAllCollections()
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionWithTools(slug)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: collection.title,
    description: collection.seoDescription,
  }
}

export default async function BestOfPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollectionWithTools(slug)

  if (!collection) {
    return <p className="text-center mt-10">Collection not found</p>
  }

  return (
    <>
      <header>
        <Navbar />
        <Hero
          title={['Best Of', 'Collection']}
          description={collection.title}
        />
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Intro Section */}
        <section className="mb-12 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {collection.seoDescription}
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {collection.updatedAt}
          </p>
        </section>

        {/* Tool Rankings */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Trophy className="text-amber-500" size={28} />
            Our Top Picks
          </h2>

          <div className="space-y-6">
            {collection.tools.map((tool) => (
              <div
                key={tool.toolSlug}
                className={`relative bg-white rounded-2xl shadow-md border-2 overflow-hidden transition-all hover:shadow-lg ${tool.rank === 1 ? 'border-amber-400' : 'border-gray-100'
                  }`}
              >
                {/* Rank Badge */}
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${tool.rank === 1 ? 'bg-amber-500' :
                  tool.rank === 2 ? 'bg-gray-400' :
                    tool.rank === 3 ? 'bg-amber-700' : 'bg-violet-500'
                  }`}>
                  #{tool.rank}
                </div>

                {tool.rank === 1 && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    EDITOR'S CHOICE
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* Tool Image */}
                  <div className="md:w-48 h-40 md:h-auto flex-shrink-0">
                    {tool.details && (
                      <img
                        src={tool.details.cover}
                        alt={tool.details.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Tool Info */}
                  <div className="flex-1 p-6 pl-6 md:pl-8">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {tool.details?.title || tool.toolSlug}
                        </h3>
                        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                          Best for: {tool.bestFor}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {tool.details?.shortDescription}
                    </p>

                    {/* Why We Pick */}
                    <div className="bg-amber-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-1">
                        <Star size={16} className="fill-amber-500 text-amber-500" />
                        Why We Pick It
                      </p>
                      <p className="text-gray-700 text-sm">{tool.whyWePick}</p>
                    </div>

                    {/* Key Features */}
                    {tool.details?.features && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.details.features.slice(0, 4).map((feature, idx) => (
                          <span key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                            <CheckCircle size={12} className="text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      {tool.details && (
                        <>
                          <a
                            href={tool.details.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-600 transition"
                          >
                            <ExternalLink size={14} />
                            Visit Site
                          </a>
                          <Link
                            href={`/${tool.toolSlug}`}
                            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition"
                          >
                            Read Review
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {collection.comparisonTable.headers.map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {collection.comparisonTable.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={`border-b border-gray-100 ${rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-6 py-4 text-gray-700">
                        {cellIdx === 0 ? (
                          <span className="font-semibold">{cell}</span>
                        ) : cell === 'Yes' ? (
                          <span className="text-green-600 font-medium">✓ Yes</span>
                        ) : cell === 'No' ? (
                          <span className="text-red-500">✗ No</span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Collections */}
        {collection.relatedCollections && collection.relatedCollections.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Compass className="text-violet-500" size={24} />
              Related Collections
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {collection.relatedCollections.map(async (relatedSlug) => {
                const allCollections = await getAllCollections()
                const relatedCollection = allCollections.find(c => c.slug === relatedSlug)
                if (!relatedCollection) return null
                return (
                  <Link
                    key={relatedSlug}
                    href={`/best/${relatedSlug}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-violet-300 hover:shadow-md transition group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-violet-600 transition">
                        {relatedCollection.title}
                      </h3>
                      <p className="text-sm text-gray-500">{relatedCollection.tools.length} tools reviewed</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="text-center bg-gradient-to-r from-violet-600 to-amber-500 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="mb-6 opacity-90">
            Start with our #1 pick and grow your business today.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-violet-700 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Explore All Tools
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
