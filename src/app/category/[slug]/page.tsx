'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductList from '@/components/product-list'

interface Tool {
  title: string
  shortDescription: string
  cover: string
  slug: string
  category: string
  link: string
  features: string[]
}

const categoryMap: Record<string, { title: string; description: string }> = {
  'product-research': {
    title: 'Product Research',
    description: 'Find winning products with these powerful research and analysis tools.',
  },
  'ai-video-marketing': {
    title: 'AI Video & Marketing',
    description: 'Create stunning videos and marketing content with AI-powered tools.',
  },
  'e-commerce-platforms': {
    title: 'E-commerce Platforms',
    description: 'Build and optimize your online store with these platform solutions.',
  },
  'marketing-seo': {
    title: 'Marketing & SEO',
    description: 'Grow your traffic and conversions with marketing and SEO tools.',
  },
  'logistics-payments': {
    title: 'Logistics & Payments',
    description: 'Manage shipping, tracking, and payments for your global business.',
  },
  'creative-tools': {
    title: 'Creative Tools',
    description: 'Design stunning visuals and graphics for your products and brand.',
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  const categoryInfo = categoryMap[slug] || {
    title: 'Tools',
    description: 'Browse our collection of cross-border e-commerce tools.',
  }

  useEffect(() => {
    async function fetchTools() {
      try {
        const res = await fetch('/api/tools')
        const allTools: Tool[] = await res.json()
        
        const categoryNameMap: Record<string, string> = {
          'product-research': 'Product Research',
          'ai-video-marketing': 'AI Video & Marketing',
          'e-commerce-platforms': 'E-commerce Platforms',
          'marketing-seo': 'Marketing & SEO',
          'logistics-payments': 'Logistics & Payments',
          'creative-tools': 'Creative Tools',
        }
        
        const categoryName = categoryNameMap[slug]
        const filtered = allTools.filter(tool => tool.category === categoryName)
        setTools(filtered)
      } catch (error) {
        console.error('Failed to fetch tools:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTools()
  }, [slug])

  return (
    <>
      <header>
        <Navbar />
        <Hero
          title={[categoryInfo.title.split(' ')[0], categoryInfo.title.split(' ').slice(1).join(' ') || 'Tools']}
          description={categoryInfo.description}
        />
      </header>

      <main className="max-w-6xl mx-auto px-3 my-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : tools.length > 0 ? (
          <ProductList products={tools} />
        ) : (
          <p className="text-center text-gray-500">No tools found in this category.</p>
        )}
      </main>

      <Footer />
    </>
  )
}
