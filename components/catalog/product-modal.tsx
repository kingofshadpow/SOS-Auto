"use client"

import { useState } from 'react'
import { X, Plus, Minus, ShoppingCart, Star, User, Calendar } from 'lucide-react'
import { Product } from '@/types/product'
import { useCatalogStore } from '@/stores/catalog-store'
import Image from 'next/image'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

interface Review {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Pierre M.',
    rating: 5,
    date: '2024-01-15',
    comment: 'Excellent produit, parfaitement compatible avec ma Peugeot 308. Installation facile et qualité au rendez-vous.'
  },
  {
    id: '2',
    userName: 'Marie L.',
    rating: 4,
    date: '2024-01-10',
    comment: 'Très bon rapport qualité-prix. Livraison rapide et emballage soigné. Je recommande.'
  },
  {
    id: '3',
    userName: 'Jean-Claude D.',
    rating: 5,
    date: '2024-01-05',
    comment: 'Pièce de qualité professionnelle. Correspond exactement à la description. Service client très réactif.'
  }
]

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })
  const { addToCart } = useCatalogStore()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity
    })
    onClose()
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Marque:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Catégorie:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{product.category}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {renderStars(Math.round(averageRating))}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({averageRating.toFixed(1)}) • {mockReviews.length} avis
                  </span>
                </div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {product.price.toFixed(2)} €
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  product.stock > 10 ? 'bg-green-500' : 
                  product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.stock > 10 ? 'En stock' : 
                   product.stock > 0 ? `Plus que ${product.stock} en stock` : 'Rupture de stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Quantité:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </button>

              {/* Specifications */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Spécifications
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Référence:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Marque:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Garantie:</span>
                    <span className="font-medium text-gray-900 dark:text-white">2 ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Livraison:</span>
                    <span className="font-medium text-gray-900 dark:text-white">24-48h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Avis Clients ({mockReviews.length})
            </h3>

            {/* Reviews List */}
            <div className="space-y-6 mb-8">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{review.userName}</p>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(review.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Laisser un avis
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Note
                  </label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Commentaire
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Partagez votre expérience avec ce produit..."
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Publier l'avis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
