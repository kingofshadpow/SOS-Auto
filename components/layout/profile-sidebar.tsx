"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, Package, Settings, LogOut, Home } from 'lucide-react'
import { useAuthStore } from "@/stores/auth-store"

export default function ProfileSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const menuItems = [
    {
      href: "/profile",
      label: "Mon Tableau de Bord",
      icon: Home,
      exact: true
    },
    {
      href: "/profile/orders",
      label: "Mes Commandes",
      icon: Package,
      exact: false
    },
    {
      href: "/profile/details",
      label: "Mes Informations",
      icon: Settings,
      exact: false
    }
  ]

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-600">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-900 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.href, item.exact)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-l-4 border-blue-800"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Se Déconnecter</span>
        </button>
      </div>
    </div>
  )
}
