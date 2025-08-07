export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subCategory: string
  partNumber: string
  price: number
  originalPrice?: number
  description: string
  specifications: Record<string, string>
  compatibility: {
    brands: string[]
    models: string[]
    years: number[]
  }
  images: string[]
  stock: number
  lowStockThreshold: number
  restockDate: string | null // Format: "YYYY-MM-DD"
  rating: number
  reviewCount: number
  isPopular?: boolean
  alternatives?: Product[]
}

export interface FilterState {
  brand: string
  category: string
  subCategory: string
  year: string
  model: string
  priceRange: [number, number]
  inStock: boolean
  searchQuery: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedAlternative?: Product
}

export interface StockStatus {
  isInStock: boolean
  isLowStock: boolean
  isOutOfStock: boolean
  restockDate?: string
  stockLevel: "high" | "medium" | "low" | "out"
}
