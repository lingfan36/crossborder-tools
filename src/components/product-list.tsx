import ProductCard from './product-card'

interface Tool {
  title: string
  shortDescription: string
  cover: string
  slug: string
  category: string
  link: string
  features?: string[]
}

interface ProductListProps {
  products: Tool[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-x-14 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} post={product} />
      ))}
    </div>
  )
}

export default ProductList
