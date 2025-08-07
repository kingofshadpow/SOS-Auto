"use client"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import SearchBar from "@/components/catalog/search-bar"
import ProductGrid from "@/components/catalog/product-grid"
import ProductModal from "@/components/catalog/product-modal"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Catalogue de Pièces Automobiles</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Découvrez notre large gamme de pièces mécaniques pour tous types de véhicules. Recherchez par marque,
              modèle, année ou numéro de série.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchBar />

          {/* Product Grid */}
          <ProductGrid />
        </div>
      </main>

      <Footer />
      <ProductModal />
    </div>
  )
}
