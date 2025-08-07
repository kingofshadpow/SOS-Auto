"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [stats, setStats] = useState({
    parts: 0,
    customers: 0,
    brands: 0,
  })
  const router = useRouter()

  // Animate counters
  useEffect(() => {
    const targetStats = { parts: 50000, customers: 15000, brands: 25 }
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        parts: Math.floor(targetStats.parts * progress),
        customers: Math.floor(targetStats.customers * progress),
        brands: Math.floor(targetStats.brands * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setStats(targetStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const handleBuyNow = () => {
    router.push("/catalog")
  }

  const handleExpertSearch = () => {
    router.push("/conseil-expert")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16">
      {/* Engine Disassembly Video Background - More visible with lighter overlays */}
      <div className="absolute inset-0 w-full h-full top-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{ filter: "brightness(0.8) contrast(1.2)" }}
        >
          <source
            src="https://media.istockphoto.com/id/1315981106/video/disassembling-car-engine-into-parts-3d-animation.mp4?s=mp4-640x640-is&k=20&c=rS2yYJ7xQF4LRJMl2rqPHOT2T8NOKGwaTn_nMqkjKVk="
            type="video/mp4"
          />
        </video>

        {/* Much lighter overlay to show more video */}
        <div className="absolute inset-0 bg-black/25 dark:bg-black/35 transition-colors duration-300"></div>

        {/* Very subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-yellow-900/10 dark:from-blue-900/20 dark:via-transparent dark:to-yellow-900/15"></div>
      </div>

      {/* Lighter fallback background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/70 via-blue-700/60 to-blue-800/70 dark:from-blue-800/80 dark:via-blue-900/70 dark:to-gray-900/80 opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
        <div className="text-center">
          {/* Main Title */}
          <div className="relative mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="text-yellow-400 drop-shadow-2xl filter">SOS Pièce Auto</span>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 text-yellow-400 blur-sm opacity-30 animate-pulse">SOS Pièce Auto</div>
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium drop-shadow-xl">
                Votre Expert en Pièces Automobiles
              </span>
            </h1>

            {/* Floating mechanical parts animation */}
            <div className="absolute -top-8 -left-8 w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce delay-0"></div>
            <div className="absolute -top-4 -right-12 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-6 left-1/4 w-5 h-5 bg-green-400/20 rounded-full animate-bounce delay-700"></div>
            <div className="absolute -bottom-8 right-1/3 w-3 h-3 bg-red-400/20 rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-0 right-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce delay-1000"></div>
          </div>

          <p className="text-xl text-gray-100 dark:text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-lg font-medium">
            Trouvez les pièces parfaites pour votre véhicule en quelques clics. Plus de 50 000 références disponibles
            avec livraison rapide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleBuyNow}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/20"
            >
              Acheter Maintenant
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExpertSearch}
              className="group border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center backdrop-blur-sm bg-white/5 hover:bg-yellow-400"
            >
              <Search className="mr-2 w-5 h-5" />
              Conseil Expert
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto">
            <div className="group backdrop-blur-md bg-white/15 dark:bg-white/10 rounded-xl p-6 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                {stats.parts.toLocaleString()}+
              </div>
              <div className="text-gray-100 dark:text-gray-200 font-medium">Pièces Disponibles</div>
            </div>
            <div className="group backdrop-blur-md bg-white/15 dark:bg-white/10 rounded-xl p-6 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-gray-100 dark:text-gray-200 font-medium">Clients Satisfaits</div>
            </div>
            <div className="group backdrop-blur-md bg-white/15 dark:bg-white/10 rounded-xl p-6 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                {stats.brands}+
              </div>
              <div className="text-gray-100 dark:text-gray-200 font-medium">Marques Supportées</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Enhanced glow effects */
        .group:hover .text-3xl {
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
        }

        /* Smooth bounce animation for floating elements */
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -15px, 0);
          }
          70% {
            transform: translate3d(0, -8px, 0);
          }
          90% {
            transform: translate3d(0, -3px, 0);
          }
        }

        /* Enhanced backdrop blur for better readability */
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .absolute.-top-8 {
            top: -4px;
            left: -4px;
          }
          
          .absolute.-top-4 {
            top: -2px;
            right: -6px;
          }
          
          .absolute.-bottom-6 {
            bottom: -3px;
          }
          
          .absolute.-bottom-8 {
            bottom: -4px;
          }
        }

        /* Ensure video loads properly */
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        /* Fallback for older browsers */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-md {
            background-color: rgba(255, 255, 255, 0.2);
          }
          
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </section>
  )
}
