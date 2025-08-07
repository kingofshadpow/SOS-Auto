"use client"

import { useRouter } from 'next/navigation'
import { Users, Award, Clock, ArrowRight } from 'lucide-react'

export default function AboutSection() {
  const router = useRouter()

  const features = [
    {
      icon: Users,
      title: "Expertise Reconnue",
      description: "Plus de 15 ans d'expérience dans l'automobile avec une équipe de spécialistes passionnés."
    },
    {
      icon: Award,
      title: "Qualité Garantie",
      description: "Sélection rigoureuse de nos fournisseurs pour vous offrir les meilleures pièces du marché."
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Livraison express 24-48h et conseil personnalisé pour tous vos projets automobiles."
    }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pourquoi Choisir SOS Pièce Auto ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous sommes votre partenaire de confiance pour toutes vos pièces automobiles. 
            Notre expertise et notre passion nous permettent de vous offrir un service d'exception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => router.push('/a-propos')}
            className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            En savoir plus
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
}
