"use client"

import { useState, useEffect } from "react"
import { X, Cookie, Settings } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setIsVisible(false)
  }

  const handleCustomize = () => {
    setShowDetails(!showDetails)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {!showDetails ? (
          // Simple Banner
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Cookie className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Nous utilisons des cookies</span> pour améliorer votre expérience sur notre site. 
                  En continuant votre navigation, vous acceptez notre utilisation des cookies.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleCustomize}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline flex items-center gap-1"
              >
                <Settings className="w-4 h-4" />
                Personnaliser
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Accepter
              </button>
            </div>
          </div>
        ) : (
          // Detailed Settings
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Cookie className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                Paramètres des Cookies
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Essential Cookies */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cookies Essentiels</h4>
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">Obligatoire</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nécessaires au fonctionnement du site (panier, connexion, sécurité).
                </p>
              </div>
              
              {/* Analytics Cookies */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cookies Analytiques</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nous aident à comprendre comment vous utilisez notre site.
                </p>
              </div>
              
              {/* Marketing Cookies */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Cookies Marketing</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Utilisés pour vous proposer des publicités personnalisées.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pour plus d'informations, consultez notre{" "}
                <a href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  politique de confidentialité
                </a>
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Refuser Tout
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white rounded-lg transition-all duration-300"
                >
                  Sauvegarder les Préférences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
