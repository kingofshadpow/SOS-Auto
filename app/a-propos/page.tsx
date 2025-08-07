"use client"

import { Users, Target, Award, Heart, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import Image from 'next/image'

export default function AboutPage() {
  const router = useRouter()

  const teamMembers = [
    {
      name: "Pierre Dubois",
      role: "Directeur Général",
      description: "20 ans d'expérience dans l'automobile, passionné par l'innovation et la satisfaction client.",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      name: "Marie Leroy",
      role: "Responsable Technique",
      description: "Experte en pièces automobiles avec une connaissance approfondie des véhicules européens.",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      name: "Jean-Claude Martin",
      role: "Chef des Achats",
      description: "Spécialiste des relations fournisseurs, garantit la qualité et les meilleurs prix.",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      name: "Sophie Bernard",
      role: "Service Client",
      description: "Dédiée à l'accompagnement des clients dans leurs recherches et leurs projets.",
      image: "/placeholder.svg?height=200&width=200"
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous sélectionnons rigoureusement nos pièces pour garantir la meilleure qualité à nos clients."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "L'automobile est notre passion. Nous partageons cette expertise avec enthousiasme."
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Un service personnalisé et des conseils d'experts pour chaque client."
    },
    {
      icon: Award,
      title: "Fiabilité",
      description: "Des partenariats durables avec les meilleurs fournisseurs européens."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              À Propos de SOS Pièce Auto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Depuis plus de 15 ans, nous sommes votre partenaire de confiance pour toutes vos pièces automobiles. 
              Notre expertise et notre passion nous permettent de vous offrir les meilleures solutions pour votre véhicule.
            </p>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Notre Histoire
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Fondée en 2008 par Pierre Dubois, SOS Pièce Auto est née d'une passion pour l'automobile 
                    et d'un constat simple : il était difficile de trouver des pièces de qualité à des prix justes.
                  </p>
                  <p>
                    Commençant par un petit atelier dans la banlieue parisienne, nous avons rapidement développé 
                    un réseau de fournisseurs fiables et établi des relations de confiance avec nos clients.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers de servir plus de 50 000 clients satisfaits et de proposer 
                    plus de 100 000 références de pièces automobiles pour toutes les marques européennes.
                  </p>
                  <p>
                    Notre croissance s'appuie sur trois piliers fondamentaux : la qualité de nos produits, 
                    l'expertise de nos conseils et la rapidité de nos livraisons.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Notre atelier"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Notre Équipe
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Des experts passionnés à votre service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-square relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Les principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Chiffres Clés */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-900 dark:to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                SOS Pièce Auto en Chiffres
              </h2>
              <p className="text-xl text-blue-100">
                15 ans d'expertise au service de l'automobile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50 000+", label: "Clients satisfaits" },
                { number: "100 000+", label: "Références disponibles" },
                { number: "24-48h", label: "Délai de livraison" },
                { number: "98%", label: "Taux de satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Prêt à découvrir nos services ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Explorez notre catalogue de plus de 100 000 pièces automobiles ou contactez nos experts 
              pour un conseil personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/catalog')}
                className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Voir le catalogue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="bg-white dark:bg-gray-700 border-2 border-blue-800 dark:border-blue-600 text-blue-800 dark:text-blue-400 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
