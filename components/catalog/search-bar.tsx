"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { useCatalogStore } from "@/stores/catalog-store"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const { searchProducts, searchByPartNumber, filters, setFilters } = useCatalogStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchProducts(searchQuery)
  }

  const handlePartNumberSearch = (partNumber: string) => {
    if (partNumber.length > 3) {
      searchByPartNumber(partNumber)
    }
  }

  const clearFilters = () => {
    setFilters({
      brand: "",
      category: "",
      subCategory: "",
      year: "",
      model: "",
      priceRange: [0, 1000],
      inStock: false,
      searchQuery: "",
    })
    setSearchQuery("")
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      {/* Main Search */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, marque ou description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Rechercher
        </button>
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </form>

      {/* Part Number Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Recherche par Numéro de Série
        </label>
        <input
          type="text"
          placeholder="Ex: REN-PF-7701208265"
          onChange={(e) => handlePartNumberSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres Avancés</h3>
            <button onClick={clearFilters} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm">
              <X className="w-4 h-4" />
              Effacer tout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marque</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ brand: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Toutes les marques</option>
                <option value="Renault">Renault</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Citroën">Citroën</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Toutes les catégories</option>
                <option value="Freinage">Freinage</option>
                <option value="Moteur">Moteur</option>
                <option value="Suspension">Suspension</option>
                <option value="Transmission">Transmission</option>
                <option value="Électrique">Électrique</option>
                <option value="Refroidissement">Refroidissement</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Année</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Toutes les années</option>
                {Array.from({ length: 21 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modèle</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => setFilters({ model: e.target.value })}
                placeholder="Ex: Clio, 308, Série 3..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gamme de Prix: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
            </label>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    priceRange: [Number.parseInt(e.target.value), filters.priceRange[1]],
                  })
                }
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* In Stock Filter */}
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({ inStock: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Seulement les produits en stock</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
