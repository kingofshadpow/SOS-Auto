"use client"

import { usePathname, useRouter } from 'next/navigation'
import { User, Package, Settings, LogOut, BarChart3 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'

export default function ProfileSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    {
      name: 'Tableau de Bord',
      href: '/profile',
      icon: BarChart3,
      active: pathname === '/profile'
    },
    {
      name: 'Mes Commandes',
      href: '/profile/orders',
      icon: Package,
      active: pathname === '/profile/orders'
    },
    {
      name: 'Mes Informations',
      href: '/profile/details',
      icon: Settings,
      active: pathname === '/profile/details'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-600">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' ? 'Administrateur' : 'Client'}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
    </div>
  )
}
