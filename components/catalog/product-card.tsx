"use client"

import type React from "react"

import { useState } from "react"
import { Star, ShoppingCart, Eye, Wrench, Zap, AlertTriangle, Clock, Bell } from "lucide-react"
import { useCatalogStore } from "@/stores/catalog-store"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

function getStockStatus(product: Product) {
  const { stock, lowStockThreshold, restockDate } = product

  if (stock === 0) {
    return {
      isInStock: false,
      isLowStock: false,
      isOutOfStock: true,
      restockDate,
      stockLevel: "out" as const,
      message: restockDate
        ? `Retour en stock le ${new Date(restockDate).toLocaleDateString("fr-FR")}`
        : "Rupture de stock",
    }
  } else if (stock <= lowStockThreshold) {
    return {
      isInStock: true,
      isLowStock: true,
      isOutOfStock: false,
      stockLevel: "low" as const,
      message: `Plus que ${stock} en stock !`,
    }
  } else {
    return {
      isInStock: true,
      isLowStock: false,
      isOutOfStock: false,
      stockLevel: stock > lowStockThreshold * 2 ? ("high" as const) : ("medium" as const),
      message: `${stock} en stock`,
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { selectProduct, addToCart } = useCatalogStore()
  const stockStatus = getStockStatus(product)

  const handleQuickView = () => {
    selectProduct(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (stockStatus.isInStock) {
      addToCart(product)
    }
  }

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleQuickView}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Wrench className="w-16 h-16 text-blue-800 dark:text-blue-400" />
          )}
        </div>

        {/* Overlay Actions */}
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
          {stockStatus.isInStock && (
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isPopular && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">Populaire</span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">Promo</span>
          )}
          {stockStatus.isOutOfStock && (
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Rupture
            </span>
          )}
          {stockStatus.isLowStock && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <Bell className="w-3 h-3" />
              Stock Faible
            </span>
          )}
        </div>

        {/* Brand Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs font-semibold">{product.brand}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Réf: {product.partNumber}</p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>

        {/* Compatibility */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Compatible:</p>
          <div className="flex flex-wrap gap-1">
            {product.compatibility.models.slice(0, 3).map((model, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
              >
                {model}
              </span>
            ))}
            {product.compatibility.models.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{product.compatibility.models.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <div
            className={`flex items-center gap-2 text-sm ${
              stockStatus.isOutOfStock
                ? "text-red-600 dark:text-red-400"
                : stockStatus.isLowStock
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-green-600 dark:text-green-400"
            }`}
          >
            {stockStatus.isOutOfStock ? (
              <Clock className="w-4 h-4" />
            ) : stockStatus.isLowStock ? (
              <Bell className="w-4 h-4" />
            ) : (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            <span className="font-medium">{stockStatus.message}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-800 dark:text-blue-400">{product.price}€</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}€</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {product.alternatives && product.alternatives.length > 0 && (
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Zap className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleAddToCart}
              disabled={stockStatus.isOutOfStock}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                stockStatus.isOutOfStock
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
