"use client"

import { useState } from "react"
import { X, Star, ShoppingCart, MessageCircle, Plus, Minus, AlertTriangle, Bell, Package, User, Calendar } from 'lucide-react'
import { useCatalogStore } from "@/stores/catalog-store"
import { useRouter } from "next/navigation"
import type { Product } from "@/types/product"

interface Review {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Marie D.",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent produit, parfaitement compatible avec ma Clio. Installation facile et qualité au rendez-vous !",
    verified: true
  },
  {
    id: "2", 
    userName: "Pierre M.",
    rating: 4,
    date: "2024-01-10",
    comment: "Bon rapport qualité-prix. Livraison rapide. Je recommande.",
    verified: true
  },
  {
    id: "3",
    userName: "Sophie L.",
    rating: 5,
    date: "2024-01-08", 
    comment: "Parfait ! Ma voiture freine beaucoup mieux maintenant. Service client très réactif.",
    verified: false
  }
]

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
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      icon: AlertTriangle,
    }
  } else if (stock <= lowStockThreshold) {
    return {
      isInStock: true,
      isLowStock: true,
      isOutOfStock: false,
      stockLevel: "low" as const,
      message: `Attention : Plus que ${stock} en stock !`,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      icon: Bell,
    }
  } else {
    return {
      isInStock: true,
      isLowStock: false,
      isOutOfStock: false,
      stockLevel: stock > lowStockThreshold * 2 ? ("high" as const) : ("medium" as const),
      message: `En stock (${stock} disponibles)`,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      icon: Package,
    }
  }
}

export default function ProductModal() {
  const { selectedProduct, selectProduct, addToCart } = useCatalogStore()
  const [selectedAlternative, setSelectedAlternative] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showNotifyMe, setShowNotifyMe] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const router = useRouter()

  if (!selectedProduct) return null

  const currentProduct = selectedAlternative || selectedProduct
  const stockStatus = getStockStatus(currentProduct)
  const IconComponent = stockStatus.icon

  const handleAddToCart = () => {
    if (stockStatus.isInStock) {
      addToCart(selectedProduct, quantity, selectedAlternative)
      selectProduct(null)
    }
  }

  const handleExpertConsult = () => {
    selectProduct(null)
    router.push(`/conseil-expert?product=${selectedProduct.id}&name=${encodeURIComponent(selectedProduct.name)}`)
  }

  const handleNotifyMe = () => {
    setShowNotifyMe(true)
    setTimeout(() => setShowNotifyMe(false), 3000)
  }

  const handleSubmitReview = () => {
    // Here you would typically send the review to your backend
    console.log("New review:", newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, comment: "" })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Détails du Produit</h2>
          <button
            onClick={() => selectProduct(null)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                {currentProduct.images && currentProduct.images[0] ? (
                  <img
                    src={currentProduct.images[0] || "/placeholder.svg"}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-800 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">{currentProduct.brand.charAt(0)}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{currentProduct.name}</p>
                  </div>
                )}
              </div>

              {/* Alternative Products */}
              {selectedProduct.alternatives && selectedProduct.alternatives.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Alternatives Disponibles</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedAlternative(null)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        !selectedAlternative
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.brand}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{selectedProduct.price}€</div>
                    </button>
                    {selectedProduct.alternatives.map((alt) => (
                      <button
                        key={alt.id}
                        onClick={() => setSelectedAlternative(alt)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                          selectedAlternative?.id === alt.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{alt.brand}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{alt.price}€</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {currentProduct.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {currentProduct.rating} ({currentProduct.reviewCount} avis)
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentProduct.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Référence: {currentProduct.partNumber}</p>
                <p className="text-gray-700 dark:text-gray-300">{currentProduct.description}</p>
              </div>

              {/* Stock Status */}
              <div className={`${stockStatus.bgColor} rounded-lg p-4`}>
                <div className={`flex items-center gap-3 ${stockStatus.color}`}>
                  <IconComponent className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">{stockStatus.message}</div>
                    {stockStatus.isOutOfStock && stockStatus.restockDate && (
                      <div className="text-sm mt-1">
                        Réapprovisionnement prévu le {new Date(stockStatus.restockDate).toLocaleDateString("fr-FR")}
                      </div>
                    )}
                    {stockStatus.isLowStock && (
                      <div className="text-sm mt-1">Commandez rapidement avant rupture de stock</div>
                    )}
                  </div>
                </div>

                {stockStatus.isOutOfStock && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleNotifyMe}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {showNotifyMe ? "✓ Notification activée" : "Me notifier du retour en stock"}
                    </button>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Spécifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(currentProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{key}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Compatibilité</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modèles:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentProduct.compatibility.models.map((model, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Années:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {Math.min(...currentProduct.compatibility.years)} -{" "}
                      {Math.max(...currentProduct.compatibility.years)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-400">{currentProduct.price}€</div>
                  </div>

                  {/* Quantity Selector */}
                  {stockStatus.isInStock && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantité:</span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {stockStatus.isInStock ? (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au Panier
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      Produit Indisponible
                    </button>
                  )}

                  <button
                    onClick={handleExpertConsult}
                    className="w-full border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Commander cette Pièce pour une Autre Voiture
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    * Nos experts vous aideront à trouver la pièce compatible pour votre autre véhicule
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Avis des Clients</h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Laisser un Avis
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Votre Avis</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Note
                    </label>
                    {renderStars(newReview.rating, true, (rating) => setNewReview(prev => ({ ...prev, rating })))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Commentaire
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                      rows={4}
                      placeholder="Partagez votre expérience avec ce produit..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReview}
                      className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      Publier l'Avis
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-blue-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{review.userName}</span>
                          {review.verified && (
                            <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                              Achat vérifié
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(review.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
