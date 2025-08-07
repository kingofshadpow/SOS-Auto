"use client"

import { useState, useEffect } from "react"
import { Search, CheckCircle, ShoppingCart, Truck } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Recherchez",
    description: "Trouvez vos pièces automobiles par marque, modèle ou référence",
    icon: Search,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Vérifiez",
    description: "Confirmez la compatibilité avec votre véhicule",
    icon: CheckCircle,
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "Commandez",
    description: "Ajoutez au panier et finalisez votre achat en toute sécurité",
    icon: ShoppingCart,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 4,
    title: "Recevez",
    description: "Livraison rapide à domicile en 24-48h",
    icon: Truck,
    color: "from-purple-500 to-purple-600",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 1 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comment Ça Marche</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Un processus simple et efficace pour trouver et commander vos pièces automobiles en quelques clics
            seulement.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full transform -translate-y-1/2 transition-all duration-1000"
            style={{ width: `${(activeStep / 4) * 100}%` }}
          ></div>

          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 cursor-pointer ${
                  activeStep >= step.id
                    ? "bg-white border-blue-500 text-blue-500 scale-110 shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <span className="font-bold">{step.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.id}
                className={`relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  activeStep === step.id
                    ? "bg-white dark:bg-gray-800 shadow-2xl scale-105"
                    : "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${step.color} mb-4 transform transition-transform duration-300 ${
                    activeStep === step.id ? "scale-110 animate-pulse" : ""
                  }`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>

                {activeStep === step.id && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Commencer Maintenant
          </button>
        </div>
      </div>
    </section>
  )
}
