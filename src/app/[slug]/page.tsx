import Hero from '@/components/hero'
import Lists from '@/components/lists'
import { getAllTools, getOneTool } from '@/services/tools'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { Metadata } from 'next'

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
    title: `${tool.title} - CrossBorder Tools`,
    description: tool.shortDescription,
  }
}

export default async function ToolDetailsPage(props: PageProps) {
  const params = await props.params

  const { slug } = params

  const tool = await getOneTool(slug)

  if (!tool) {
    return <p className="text-center mt-10">Tool not found</p>
  }

  return (
    <>
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
