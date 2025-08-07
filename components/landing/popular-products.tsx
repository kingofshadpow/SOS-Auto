"use client"

import { useState } from "react"
import { ShoppingCart, Eye, Star } from "lucide-react"

const productsByBrand = {
  Renault: [
    {
      id: 1,
      name: "Filtre à Huile",
      ref: "REN-FO-001",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&crop=center",
      compatibility: "Clio, Megane, Scenic",
      stock: 25,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Plaquettes de Frein",
      ref: "REN-PF-002",
      price: 45.5,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      compatibility: "Captur, Kadjar",
      stock: 12,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Courroie de Distribution",
      ref: "REN-CD-003",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop&crop=center",
      compatibility: "Duster, Logan",
      stock: 8,
      rating: 4.7,
    },
  ],
  Peugeot: [
    {
      id: 4,
      name: "Amortisseur Avant",
      ref: "PEU-AA-001",
      price: 125.0,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop&crop=center",
      compatibility: "208, 308, 3008",
      stock: 15,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Filtre à Air",
      ref: "PEU-FA-002",
      price: 22.9,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      compatibility: "2008, 5008",
      stock: 30,
      rating: 4.8,
    },
    {
      id: 6,
      name: "Disque de Frein",
      ref: "PEU-DF-003",
      price: 67.8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop&crop=center",
      compatibility: "Partner, Rifter",
      stock: 18,
      rating: 4.9,
    },
  ],
  BMW: [
    {
      id: 7,
      name: "Bougie d'Allumage",
      ref: "BMW-BA-001",
      price: 35.99,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop&crop=center",
      compatibility: "Série 1, Série 3",
      stock: 22,
      rating: 4.9,
    },
    {
      id: 8,
      name: "Radiateur",
      ref: "BMW-RAD-002",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop&crop=center",
      compatibility: "X1, X3, X5",
      stock: 6,
      rating: 4.7,
    },
    {
      id: 9,
      name: "Alternateur",
      ref: "BMW-ALT-003",
      price: 245.0,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop&crop=center",
      compatibility: "Série 5, Série 7",
      stock: 4,
      rating: 4.8,
    },
  ],
}

export default function PopularProducts() {
  const [selectedBrand, setSelectedBrand] = useState("Renault")
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({})

  const brands = Object.keys(productsByBrand)

  const toggleShowMore = (brand: string) => {
    setShowMore((prev) => ({ ...prev, [brand]: !prev[brand] }))
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pièces Populaires</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez nos pièces les plus demandées, organisées par marque automobile. Qualité garantie et compatibilité
            vérifiée.
          </p>
        </div>

        {/* Brand Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedBrand === brand
                  ? "bg-blue-800 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-16">
          {brands.map((brand) => (
            <div key={brand} className={selectedBrand === brand ? "block" : "hidden"}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pièces {brand}</h3>
                <button
                  onClick={() => toggleShowMore(brand)}
                  className="text-blue-800 dark:text-blue-400 hover:text-yellow-600 dark:hover:text-yellow-400 font-semibold transition-colors"
                >
                  {showMore[brand] ? "Voir Moins" : "Voir Plus"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsByBrand[brand as keyof typeof productsByBrand]
                  .slice(0, showMore[brand] ? undefined : 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                          }}
                        />
                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        {product.stock < 10 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Stock Limité
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Réf: {product.ref}</p>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          Compatible: {product.compatibility}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-800 dark:text-blue-400">
                              {product.price}€
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Stock: {product.stock} unités</p>
                          </div>

                          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                            <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
