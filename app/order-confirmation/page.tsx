"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, MapPin, Calendar, Download, ArrowRight } from 'lucide-react'
import { useOrderStore } from "@/stores/order-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const { getOrderById } = useOrderStore()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [orderId, getOrderById, router])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
      case "shipped":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
      case "delivered":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "En cours de traitement"
      case "shipped":
        return "Expédiée"
      case "delivered":
        return "Livrée"
      default:
        return "En attente"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Commande Confirmée !
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Merci pour votre commande, elle a été reçue avec succès.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Vous recevrez un email de confirmation sous peu.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-500 dark:text-gray-400">Numéro de commande</div>
                <div className="font-bold text-gray-900 dark:text-white">{order.id}</div>
              </div>
              
              <div className="text-center">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-500 dark:text-gray-400">Date de commande</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {new Date(order.date).toLocaleDateString("fr-FR")}
                </div>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Articles commandés</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.product.images && item.product.images[0] ? (
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-800 dark:bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {item.product.brand.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.product.brand} - Réf: {item.product.partNumber}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toFixed(2)}€
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.price.toFixed(2)}€ / unité
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Total payé</span>
                <span className="text-2xl font-bold text-blue-800 dark:text-blue-400">
                  {order.total.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Adresse de livraison
            </h3>
            <div className="text-gray-600 dark:text-gray-400">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Prochaines étapes
            </h3>
            <div className="space-y-3 text-blue-800 dark:text-blue-400">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Préparation de votre commande (1-2 jours ouvrés)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Expédition et envoi du numéro de suivi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Livraison à votre domicile</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Télécharger la Facture
            </button>
            
            <Link
              href="/profile/orders"
              className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Suivre ma Commande
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/catalog"
              className="border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Continuer mes Achats
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
