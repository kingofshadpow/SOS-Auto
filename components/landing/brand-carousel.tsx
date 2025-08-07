"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCatalogStore } from "@/stores/catalog-store"

const brands = [
  {
    name: "Renault",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Renault_2009_logo.svg/200px-Renault_2009_logo.svg.png",
  },
  {
    name: "Peugeot",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Peugeot_logo.svg/200px-Peugeot_logo.svg.png",
  },
  {
    name: "Citroën",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Citro%C3%ABn_logo_2009.svg/200px-Citro%C3%ABn_logo_2009.svg.png",
  },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png" },
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png",
  },
  {
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/200px-Audi-Logo_2016.svg.png",
  },
  {
    name: "Volkswagen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
  },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png" },
  {
    name: "Nissan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Nissan_logo.svg/200px-Nissan_logo.svg.png",
  },
  {
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png",
  },
]

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { setFilters } = useCatalogStore()

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 1

    const animate = () => {
      scrollPosition += scrollSpeed

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const handleBrandClick = (brandName: string) => {
    // Set the brand filter and navigate to catalog
    setFilters({ brand: brandName })
    router.push("/catalog")
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Marques Partenaires</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nous travaillons avec les plus grandes marques automobiles pour vous offrir des pièces de qualité originale
            et adaptées.{" "}
            <span className="text-blue-800 dark:text-blue-400 font-medium">
              Cliquez sur une marque pour voir nos pièces disponibles.
            </span>
          </p>
        </div>

        <div ref={scrollRef} className="flex space-x-8 overflow-hidden" style={{ scrollBehavior: "auto" }}>
          {/* Duplicate brands for seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="flex-shrink-0 group cursor-pointer">
              <button
                onClick={() => handleBrandClick(brand.name)}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50 dark:hover:from-blue-900/20 dark:hover:to-yellow-900/20 w-full"
              >
                <div className="h-12 w-24 flex items-center justify-center mx-auto mb-2">
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={`Logo ${brand.name}`}
                    className="max-h-12 max-w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if logo fails to load
                      e.currentTarget.src = "/placeholder.svg?height=48&width=96"
                    }}
                  />
                </div>
                <div className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-yellow-400 transition-colors">
                  {brand.name}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
