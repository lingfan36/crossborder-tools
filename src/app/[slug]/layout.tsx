import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Newsletter from '@/components/newsletter'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Tool Details - CrossBorder Tools'
  const description =
    'Discover detailed information about cross-border e-commerce tools to help grow your global business.'
  const url = 'https://lingfan.site'

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'CrossBorder Tools',
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  }

  return metadata
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </>
  )
}
