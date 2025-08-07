"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Truck, Download, ArrowRight } from 'lucide-react'
import { useOrderStore } from '@/stores/order-store'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import Image from 'next/image'

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null)
  const { getOrderById } = useOrderStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      setOrder(foundOrder)
    }
  }, [orderId, getOrderById])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Commande introuvable
            </h1>
            <button
              onClick={() => router.push('/')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Commande confirmée !
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Merci pour votre commande. Nous préparons vos pièces avec soin.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Détails de la commande
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Commande #{order.id}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Marque: {item.brand} • Quantité: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                  <span className="text-gray-900 dark:text-white">{order.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                  <span className="text-gray-900 dark:text-white">
                    {order.shipping === 0 ? 'Gratuit' : `${order.shipping.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">{order.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Informations de livraison
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-900 dark:text-white font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.street}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.postalCode} {order.shippingAddress.city}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.phone}
                </p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Livraison estimée:</strong> {estimatedDelivery.toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Prochaines étapes
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Commande confirmée
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Nous avons reçu votre commande
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Préparation en cours
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Vos pièces sont en cours de préparation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Expédition
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Vous recevrez un email de suivi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Que souhaitez-vous faire maintenant ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/profile/orders')}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Suivre ma commande</span>
              </button>
              
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Imprimer la facture</span>
              </button>
              
              <button
                onClick={() => router.push('/catalog')}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                <span>Continuer mes achats</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Une question sur votre commande ?
            </p>
            <button
              onClick={() => router.push('/contact')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Contactez notre service client
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
