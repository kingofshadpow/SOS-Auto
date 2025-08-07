"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Truck } from 'lucide-react'
import { useCatalogStore } from "@/stores/catalog-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCatalogStore()
  const router = useRouter()

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shippingCost = subtotal > 100 ? 0 : 5.99
  const total = subtotal + shippingCost

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Votre Panier est Vide
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Découvrez notre large gamme de pièces automobiles et ajoutez vos articles favoris.
              </p>
              <Link
                href="/catalog"
                className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Continuer mes Achats
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/catalog"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour au Catalogue
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mon Panier ({cart.length} article{cart.length > 1 ? 's' : ''})
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
            >
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedAlternative?.id || 'main'}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.product.images && item.product.images[0] ? (
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="w-8 h-8 bg-blue-800 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                            <span className="text-white text-sm font-bold">
                              {(item.selectedAlternative || item.product).brand.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Marque: {(item.selectedAlternative || item.product).brand}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Réf: {(item.selectedAlternative || item.product).partNumber}
                      </p>
                      {item.selectedAlternative && (
                        <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded mt-2">
                          Alternative sélectionnée
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-800 dark:text-blue-400">
                        {((item.selectedAlternative || item.product).price * item.quantity).toFixed(2)}€
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {(item.selectedAlternative || item.product).price.toFixed(2)}€ / unité
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Résumé de la Commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Livraison
                    </span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">Gratuite</span>
                      ) : (
                        `${shippingCost.toFixed(2)}€`
                      )}
                    </span>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                        Ajoutez {(100 - subtotal).toFixed(2)}€ pour bénéficier de la livraison gratuite !
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Passer au Paiement
                  </button>
                  
                  <Link
                    href="/catalog"
                    className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-300 text-center block"
                  >
                    Continuer mes Achats
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Paiement 100% sécurisé
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
