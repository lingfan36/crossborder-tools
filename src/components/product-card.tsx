import { FC } from 'react'
import { ExternalLink } from 'lucide-react'

interface Tool {
  title: string
  shortDescription: string
  cover: string
  slug: string
  category: string
  link: string
}

interface ProductCardProps {
  post: Tool
}

const ProductCard: FC<ProductCardProps> = ({ post }) => {
  const { title, slug, cover, category, link, shortDescription } = post

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline">
      <div
        key={slug}
        className="flex transform flex-col gap-3 transition-transform hover:scale-105"
      >
        <figure className="relative h-48 w-full overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-full w-full rounded-xl bg-gray-200 object-cover"
          />
        </figure>

        <div className="mt-1 flex items-center gap-2">
          <span className="w-fit rounded-xl bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
            {category}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-500">
            <ExternalLink size={14} />
            Visit Site
          </span>
        </div>

        <h3 className="hover:text-theme mb-1 text-xl font-bold transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{shortDescription}</p>
      </div>
    </a>
  )
}

export default ProductCard
