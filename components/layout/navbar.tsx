"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, User, Wrench } from 'lucide-react'
import { useCatalogStore } from "@/stores/catalog-store"
import { useAuthStore } from "@/stores/auth-store"
import ThemeToggle from "./theme-toggle"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCatalogStore()
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(href)
    }
    setIsMenuOpen(false)
  }

  const handleUserClick = () => {
    if (isAuthenticated) {
      router.push("/profile")
    } else {
      router.push("/login")
    }
  }

  const handleCartClick = () => {
    router.push("/cart")
  }

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalog" },
    { name: "Conseil Expert", href: "/conseil-expert" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNavigation("/")} className="flex items-center space-x-2 smooth-hover">
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-xl font-bold text-blue-900 dark:text-white">SOS Pièce Auto</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 font-medium smooth-hover"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Shopping Cart */}
            <button 
              onClick={handleCartClick}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 smooth-hover"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button 
              onClick={handleUserClick}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 smooth-hover group"
              title={isAuthenticated ? `${user?.firstName} ${user?.lastName}` : "Se connecter"}
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full"></span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 smooth-hover"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg mt-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 smooth-hover rounded"
              >
                {link.name}
              </button>
            ))}
            
            {/* Mobile User Menu */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <button
                onClick={handleUserClick}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 smooth-hover rounded"
              >
                {isAuthenticated ? "Mon Profil" : "Se Connecter"}
              </button>
              <button
                onClick={handleCartClick}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 smooth-hover rounded"
              >
                Panier ({cartCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
