"use client"

import { useState } from "react"
import { Award, Users, Clock, Shield, ChevronRight, Star } from "lucide-react"

export default function AboutSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Award,
      title: "15+ Ans d'Expérience",
      description: "Une expertise reconnue dans le domaine des pièces automobiles depuis 2008.",
      details:
        "Nous avons développé une connaissance approfondie des besoins de nos clients et des spécificités de chaque véhicule.",
    },
    {
      icon: Users,
      title: "Équipe d'Experts",
      description: "Des professionnels passionnés à votre service pour vous conseiller.",
      details: "Notre équipe de mécaniciens et conseillers techniques vous accompagne dans le choix de vos pièces.",
    },
    {
      icon: Clock,
      title: "Livraison Rapide",
      description: "Livraison en 24-48h partout en France métropolitaine.",
      details: "Grâce à notre réseau logistique optimisé, recevez vos pièces rapidement et en parfait état.",
    },
    {
      icon: Shield,
      title: "Garantie Qualité",
      description: "Toutes nos pièces sont garanties et certifiées conformes.",
      details: "Nous travaillons uniquement avec des fournisseurs agréés pour vous assurer la meilleure qualité.",
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Propriétaire Renault Clio",
      content: "Service excellent ! J'ai trouvé ma pièce rapidement et la livraison était très rapide.",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Mécanicien Indépendant",
      content: "Je commande régulièrement chez SOS Pièce Auto. Qualité et prix au rendez-vous !",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Propriétaire BMW X3",
      content: "L'équipe m'a parfaitement conseillée. Ma voiture est repartie comme neuve !",
      rating: 5,
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">À Propos de SOS Pièce Auto</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous sommes votre partenaire de confiance pour l'entretien et la réparation de votre
            véhicule. Notre mission : vous fournir les meilleures pièces automobiles au meilleur prix.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 shadow-lg"
                      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{feature.description}</p>
                      {activeFeature === index && (
                        <p className="text-blue-600 dark:text-blue-400 text-sm animate-fadeIn">{feature.details}</p>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        activeFeature === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Image/Stats Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nos Chiffres</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50,000+</div>
                  <div className="text-gray-600 dark:text-gray-400">Pièces en Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15,000+</div>
                  <div className="text-gray-600 dark:text-gray-400">Clients Satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">25+</div>
                  <div className="text-gray-600 dark:text-gray-400">Marques Partenaires</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">98%</div>
                  <div className="text-gray-600 dark:text-gray-400">Taux de Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Notre Engagement</h3>
              <p className="mb-4">
                Nous nous engageons à vous fournir des pièces de qualité originale ou équivalente, avec un service
                client irréprochable et des délais de livraison respectés.
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Garantie 2 ans sur toutes nos pièces</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Ce que disent nos clients
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
