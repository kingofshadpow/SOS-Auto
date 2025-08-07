"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, ShoppingCart, Clock, CheckCircle } from 'lucide-react'
import { useAuthStore } from "@/stores/auth-store"
import { useOrderStore } from "@/stores/order-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProfileSidebar from "@/components/layout/profile-sidebar"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore()
  const { orders } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  const recentOrders = orders.slice(0, 3)
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter(order => order.status === "processing").length

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
              {/* Welcome Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Bonjour {user.firstName} ! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Bienvenue sur votre tableau de bord SOS Pièce Auto. Retrouvez ici toutes vos informations et commandes.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
                    <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">{totalOrders}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Commandes Total</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                    <ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800 dark:text-green-400">{totalSpent.toFixed(0)}€</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Total Dépensé</div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 text-center">
                    <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-400">{pendingOrders}</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">En Cours</div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Commandes Récentes</h2>
                  <button
                    onClick={() => router.push("/profile/orders")}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                  >
                    Voir tout
                  </button>
                </div>

                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Commande #{order.id}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(order.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {order.total.toFixed(2)}€
                            </div>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "delivered" 
                                ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                                : order.status === "shipped"
                                ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                                : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                            }`}>
                              {order.status === "delivered" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {order.status === "delivered" ? "Livrée" : 
                               order.status === "shipped" ? "Expédiée" : "En cours"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-800 dark:text-blue-400">
                                  {item.product.brand.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.product.name.substring(0, 20)}...
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              +{order.items.length - 3} autres
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Aucune commande
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Vous n'avez pas encore passé de commande.
                    </p>
                    <button
                      onClick={() => router.push("/catalog")}
                      className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Découvrir nos Produits
                    </button>
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
