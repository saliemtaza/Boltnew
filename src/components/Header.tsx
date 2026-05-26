import { Search } from 'lucide-react'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  filterCategory: string
  onFilterChange: (category: string) => void
  categories: string[]
}

export default function Header({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  categories,
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalog Store</h1>
          <p className="text-gray-600">Browse our collection of premium products</p>
        </div>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.filter(Boolean).map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}