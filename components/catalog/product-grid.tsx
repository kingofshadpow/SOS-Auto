"use client"

import { useCatalogStore } from "@/stores/catalog-store"
import ProductCard from "./product-card"
import { Package, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProductGrid() {
  const { filteredProducts, isLoading, filters } = useCatalogStore()
  const router = useRouter()

  const handleRequestPart = () => {
    const searchQuery = filters.searchQuery || "Pièce recherchée"
    router.push(`/conseil-expert?requested=${encodeURIComponent(searchQuery)}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pièce non trouvée</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Nous n'avons pas cette pièce en stock actuellement, mais nos experts peuvent vous aider à la trouver.
        </p>
        <button
          onClick={handleRequestPart}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <MessageCircle className="w-5 h-5" />
          Commander cette Pièce
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Nos experts vous contacteront sous 24h avec une solution personnalisée
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Produits ({filteredProducts.length})</h2>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
          <option>Trier par pertinence</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
          <option>Meilleures notes</option>
          <option>Plus populaires</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
