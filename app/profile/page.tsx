"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ShoppingCart, Clock, TrendingUp } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useOrderStore } from '@/stores/order-store'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import ProfileSidebar from '@/components/layout/profile-sidebar'

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuthStore()
  const { getOrdersByUserId } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const userOrders = getOrdersByUserId(user.id)
  const totalSpent = userOrders.reduce((total, order) => total + order.total, 0)
  const recentOrders = userOrders.slice(0, 3)

  const stats = [
    {
      name: 'Commandes totales',
      value: userOrders.length,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Montant total',
      value: `${totalSpent.toFixed(2)} €`,
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      name: 'Commandes en cours',
      value: userOrders.filter(order => ['pending', 'confirmed', 'shipped'].includes(order.status)).length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      name: 'Économies réalisées',
      value: '127,50 €',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tableau de Bord
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Bienvenue {user.firstName}, voici un aperçu de votre compte
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <div className="flex items-center">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.name}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Commandes récentes
                  </h2>
                  <button
                    onClick={() => router.push('/profile/orders')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Voir toutes
                  </button>
                </div>

                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Commande #{order.id}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString('fr-FR')} • {order.items.length} article{order.items.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {order.total.toFixed(2)} €
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {order.status === 'delivered' ? 'Livrée' : 
                             order.status === 'shipped' ? 'Expédiée' : 
                             order.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Aucune commande récente
                    </p>
                    <button
                      onClick={() => router.push('/catalog')}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Découvrir nos produits
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Actions rapides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push('/catalog')}
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Parcourir le catalogue</span>
                  </button>
                  
                  <button
                    onClick={() => router.push('/profile/orders')}
                    className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    <span>Mes commandes</span>
                  </button>
                  
                  <button
                    onClick={() => router.push('/contact')}
                    className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    <span>Support client</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
