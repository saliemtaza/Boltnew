import { X, ShoppingCart, Heart } from 'lucide-react'
import { Product } from '../types'
import { useState } from 'react'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto max-h-96 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/400x400?text=Product+Image'
                }}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600">Stock available</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <label className="text-gray-700 font-medium">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    liked
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                  {liked ? 'Liked' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}