'use client'
import { ArrowUp } from 'lucide-react'
import Link from 'next/link'

const categories = {
  title: 'Categories',
  items: [
    { label: 'Product Research', href: '/category/product-research' },
    { label: 'AI Video & Marketing', href: '/category/ai-video-marketing' },
    { label: 'E-commerce Platforms', href: '/category/e-commerce-platforms' },
    { label: 'Marketing & SEO', href: '/category/marketing-seo' },
    { label: 'Logistics & Payments', href: '/category/logistics-payments' },
    { label: 'Creative Tools', href: '/category/creative-tools' },
  ],
}

const resources = {
  title: 'Resources',
  items: [
    { label: 'All Tools', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#191F33]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 py-16 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-8 flex items-center gap-3 text-white">
              <img src="/cross-border.png" alt="CrossBorder Tools" className="h-8" />
              <h6 className="text-2xl font-semibold tracking-wider">CrossBorder Tools</h6>
            </Link>
            <p className="mt-3 max-w-sm text-base font-normal text-[#767E94]">
              Your go-to directory for discovering the best cross-border e-commerce tools. 
              Helping global sellers succeed since 2025.
            </p>
            <p className="mt-4 text-[#767E94]">
              Contact: <a href="https://t.me/blue2l" className="text-[#00AAFF] hover:underline">Telegram</a>
              {' | '}
              <a href="mailto:xxx@lingfan.site" className="text-[#00AAFF] hover:underline">xxx@lingfan.site</a>
            </p>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{categories.title}</h6>
            <ul>
              {categories.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#767E94] transition-all duration-150 ease-in hover:text-white hover:underline hover:decoration-[#00AAFF] hover:underline-offset-8"
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{resources.title}</h6>
            <ul>
              {resources.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#767E94] transition-all duration-150 ease-in hover:text-white hover:underline hover:decoration-[#00AAFF] hover:underline-offset-8"
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative bg-[#2E3447]">
        <button
          onClick={scrollToTop}
          className="absolute -top-7 right-8 flex size-14 items-center justify-center rounded-full border-[6px] border-[#191F33] bg-[#00AAFF] md:right-16"
        >
          <ArrowUp color="#fff" size={22} />
        </button>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-[26px] md:flex-row md:justify-between">
          <p className="text-center text-[#767E94]">
            CrossBorder Tools © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
