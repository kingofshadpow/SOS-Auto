"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/landing/hero-section"
import BrandCarousel from "@/components/landing/brand-carousel"
import PopularProducts from "@/components/landing/popular-products"
import HowItWorks from "@/components/landing/how-it-works"
import AboutSection from "@/components/landing/about-section"
import ContactSection from "@/components/landing/contact-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <BrandCarousel />
        <PopularProducts />
        <HowItWorks />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
