import { ShoppingCart } from 'lucide-react'
import { Product } from '../types'

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-100 h-64">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/400x400?text=Product+Image'
              }}
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}