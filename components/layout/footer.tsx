"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Wrench } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { name: "Accueil", href: "#" },
    { name: "Catalogue", href: "#catalogue" },
    { name: "Recherche Expert", href: "#expert" },
    { name: "À Propos", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const legalLinks = [
    { name: "Mentions Légales", href: "#legal" },
    { name: "Conditions Générales", href: "#terms" },
    { name: "Politique de Confidentialité", href: "#privacy" },
    { name: "Cookies", href: "#cookies" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xl font-bold">SOS Pièce Auto</span>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour toutes vos pièces automobiles. Plus de 15 ans d'expérience au service
              de vos véhicules.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>contact@sospiece-auto.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>123 Rue de l'Automobile, 75001 Paris</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400">Informations Légales</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400">Newsletter</h3>
            <p className="text-gray-400 mb-4">Restez informé de nos dernières offres et nouveautés.</p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isSubscribed
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
                }`}
              >
                {isSubscribed ? "Inscrit ✓" : "S'abonner"}
              </button>
            </form>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Suivez-nous</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-110 ${social.color}`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SOS Pièce Auto. Tous droits réservés.</p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Paiement sécurisé</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center text-white font-bold">
                CB
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center text-white font-bold">
                V
              </div>
              <div className="w-8 h-5 bg-yellow-600 rounded text-xs flex items-center justify-center text-white font-bold">
                M
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
