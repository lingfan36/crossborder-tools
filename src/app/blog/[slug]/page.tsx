import { getAllPosts, getPostBySlug } from '@/services/posts'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Newsletter from '@/components/newsletter'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} - CrossBorder Tools Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return <p className="text-center mt-10">Post not found</p>
  }

  return (
    <>
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8">
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <article>
          <img src={post.coverImage} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-8" />
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>

      <Newsletter />
      <Footer />
    </>
  )
}
