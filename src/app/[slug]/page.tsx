import Hero from '@/components/hero'
import Lists from '@/components/lists'
import { getAllCourses, getOneCourse } from '@/services/courses'
import { ExternalLink } from 'lucide-react'

interface StaticParams {
  slug: string
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<StaticParams[]> {
  const courses = await getAllCourses()

  return courses.map((course) => {
    return {
      slug: `${course.slug}`,
    }
  })
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ToolDetailsPage(props: PageProps) {
  const params = await props.params

  const { slug } = params

  const tool = await getOneCourse(slug)

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
