"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, Eye, Download, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useAuthStore } from "@/stores/auth-store"
import { useOrderStore } from "@/stores/order-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProfileSidebar from "@/components/layout/profile-sidebar"

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore()
  const { orders } = useOrderStore()
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
      case "shipped":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
      case "delivered":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400"
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
      case "cancelled":
        return "Annulée"
      default:
        return "En attente"
    }
  }

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Mes Commandes ({filteredOrders.length})
                  </h1>
                  
                  {/* Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">Toutes les commandes</option>
                    <option value="processing">En cours</option>
                    <option value="shipped">Expédiées</option>
                    <option value="delivered">Livrées</option>
                    <option value="cancelled">Annulées</option>
                  </select>
                </div>

                {filteredOrders.length > 0 ? (
                  <div className="space-y-6">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                Commande #{order.id}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Passée le {new Date(order.date).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">
                              {order.total.toFixed(2)}€
                            </div>
                            {order.trackingNumber && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Suivi: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="mb-4">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Articles ({order.items.length}):
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                                <div className="w-6 h-6 bg-blue-800 dark:bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {item.product.brand.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {item.product.name.substring(0, 25)}...
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  ×{item.quantity}
                                </span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg px-3 py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  +{order.items.length - 3} autres
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Adresse de livraison:
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {order.shippingAddress.street}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {selectedOrder === order.id ? "Masquer" : "Voir"} Détails
                          </button>
                          
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                            Facture
                          </button>
                          
                          {order.status === "shipped" && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors">
                              <Truck className="w-4 h-4" />
                              Suivre
                            </button>
                          )}
                        </div>

                        {/* Expanded Details */}
                        {selectedOrder === order.id && (
                          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Détail des articles</h4>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-800 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                                      <span className="text-white font-bold">
                                        {item.product.brand.charAt(0)}
                                      </span>
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-gray-900 dark:text-white">
                                        {item.product.name}
                                      </h5>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.product.brand} - Réf: {item.product.partNumber}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                      {(item.price * item.quantity).toFixed(2)}€
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {item.quantity} × {item.price.toFixed(2)}€
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {filterStatus === "all" ? "Aucune commande" : `Aucune commande ${getStatusText(filterStatus).toLowerCase()}`}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {filterStatus === "all" 
                        ? "Vous n'avez pas encore passé de commande."
                        : `Vous n'avez aucune commande avec ce statut.`
                      }
                    </p>
                    {filterStatus === "all" && (
                      <button
                        onClick={() => router.push("/catalog")}
                        className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Découvrir nos Produits
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
