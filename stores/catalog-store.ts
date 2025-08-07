import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, FilterState, CartItem } from "@/types/product"
import { mockProducts } from "@/data/products"

// Add debounced search function at the top
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

interface CatalogState {
  products: Product[]
  filteredProducts: Product[]
  filters: FilterState
  selectedProduct: Product | null
  cart: CartItem[]
  isLoading: boolean

  // Actions
  setFilters: (filters: Partial<FilterState>) => void
  searchProducts: (query: string) => void
  searchByPartNumber: (partNumber: string) => void
  selectProduct: (product: Product | null) => void
  addToCart: (product: Product, quantity?: number, alternative?: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyFilters: () => void
}

const initialFilters: FilterState = {
  brand: "",
  category: "",
  subCategory: "",
  year: "",
  model: "",
  priceRange: [0, 1000],
  inStock: false,
  searchQuery: "",
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      filteredProducts: mockProducts,
      filters: initialFilters,
      selectedProduct: null,
      cart: [],
      isLoading: false,

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }))
        get().applyFilters()
      },

      searchProducts: (query) => {
        set((state) => ({
          filters: { ...state.filters, searchQuery: query },
          isLoading: true,
        }))

        // Debounce the actual filtering
        const debouncedFilter = debounce(() => {
          get().applyFilters()
          set({ isLoading: false })
        }, 300)

        debouncedFilter()
      },

      searchByPartNumber: (partNumber) => {
        const products = get().products
        const found = products.filter((p) => p.partNumber.toLowerCase().includes(partNumber.toLowerCase()))
        set({ filteredProducts: found })
      },

      selectProduct: (product) => {
        set({ selectedProduct: product })
      },

      addToCart: (product, quantity = 1, alternative) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.selectedAlternative?.id === alternative?.id,
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.selectedAlternative?.id === alternative?.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              {
                product,
                quantity,
                selectedAlternative: alternative,
              },
            ],
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }))
      },

      updateCartQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        set({ cart: [] })
      },

      applyFilters: () => {
        set({ isLoading: true })

        // Use setTimeout to prevent blocking UI
        setTimeout(() => {
          const { products, filters } = get()
          let filtered = [...products]

          // Search query (case insensitive, multiple terms)
          if (filters.searchQuery) {
            const searchTerms = filters.searchQuery
              .toLowerCase()
              .split(" ")
              .filter((term) => term.length > 0)
            filtered = filtered.filter((product) => {
              const searchableText =
                `${product.name} ${product.brand} ${product.partNumber} ${product.description}`.toLowerCase()
              return searchTerms.every((term) => searchableText.includes(term))
            })
          }

          // Apply other filters...
          if (filters.brand) {
            filtered = filtered.filter((p) => p.brand === filters.brand)
          }

          if (filters.category) {
            filtered = filtered.filter((p) => p.category === filters.category)
          }

          if (filters.subCategory) {
            filtered = filtered.filter((p) => p.subCategory === filters.subCategory)
          }

          if (filters.year) {
            const year = Number.parseInt(filters.year)
            filtered = filtered.filter((p) => p.compatibility.years.includes(year))
          }

          if (filters.model) {
            filtered = filtered.filter((p) =>
              p.compatibility.models.some((model) => model.toLowerCase().includes(filters.model.toLowerCase())),
            )
          }

          filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

          if (filters.inStock) {
            filtered = filtered.filter((p) => p.stock > 0)
          }

          set({ filteredProducts: filtered, isLoading: false })
        }, 0)
      },
    }),
    {
      name: "catalog-storage",
      partialize: (state) => ({ cart: state.cart, filters: state.filters }),
    },
  ),
)
