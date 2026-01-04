import { getAllPosts } from '@/services/posts'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - CrossBorder Tools',
  description: 'Expert guides, tips and strategies for cross-border e-commerce success.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Navbar />
      <Hero title={['E-commerce', 'Blog']} description="Expert guides and strategies for cross-border sellers" />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <Link href={`/blog/${post.slug}`}>
                  <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <p className="text-sm text-amber-600 mb-2">{post.date}</p>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </>
  )
}
