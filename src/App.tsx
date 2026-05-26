import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      // If no data from Supabase, use mock data
      if (!data || data.length === 0) {
        setProducts(getMockProducts())
      } else {
        setProducts(data as Product[])
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Using demo data.')
      setProducts(getMockProducts())
    } finally {
      setLoading(false)
    }
  }

  const getMockProducts = (): Product[] => [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      category: 'electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 49.99,
      category: 'electronics',
      description: 'Ergonomic wireless mouse with long battery life',
      image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Mechanical Keyboard',
      price: 159.99,
      category: 'electronics',
      description: 'RGB backlit mechanical keyboard for gaming and work',
      image_url: 'https://images.unsplash.com/photo-1587829191301-b5b8ad4e306f?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Ultra HD Monitor',
      price: 499.99,
      category: 'electronics',
      description: '4K Ultra HD monitor for professionals',
      image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Laptop Stand',
      price: 79.99,
      category: 'accessories',
      description: 'Adjustable aluminum laptop stand',
      image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'USB-C Hub',
      price: 89.99,
      category: 'accessories',
      description: 'Multi-port USB-C hub with charging support',
      image_url: 'https://images.unsplash.com/photo-1625948515291-c929b87d0d0f?w=500&h=500&fit=crop',
      created_at: new Date().toISOString(),
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
        categories={categories}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onProductClick={(product) => {
                  setSelectedProduct(product)
                  setShowModal(true)
                }}
              />
            )}
          </>
        )}
      </main>

      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}

export default App