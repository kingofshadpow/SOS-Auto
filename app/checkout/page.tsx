"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MapPin, Truck, CreditCard, Shield } from 'lucide-react'
import { useCatalogStore } from "@/stores/catalog-store"
import { useAuthStore } from "@/stores/auth-store"
import { useOrderStore } from "@/stores/order-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
    
    // Shipping Method
    shippingMethod: "standard",
    
    // Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  })

  const { cart, clearCart } = useCatalogStore()
  const { user, isAuthenticated } = useAuthStore()
  const { addOrder } = useOrderStore()
  const router = useRouter()

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shippingCost = formData.shippingMethod === "express" ? 9.99 : subtotal > 100 ? 0 : 5.99
  const total = subtotal + shippingCost

  const steps = [
    { id: 1, title: "Adresse de Livraison", icon: MapPin },
    { id: 2, title: "Mode de Livraison", icon: Truck },
    { id: 3, title: "Paiement", icon: CreditCard }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create order
    const orderId = addOrder({
      status: "processing",
      items: cart.map(item => ({
        product: item.selectedAlternative || item.product,
        quantity: item.quantity,
        price: (item.selectedAlternative || item.product).price
      })),
      total,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      }
    })
    
    // Clear cart
    clearCart()
    
    // Redirect to confirmation
    router.push(`/order-confirmation?orderId=${orderId}`)
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Finaliser ma Commande</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id 
                        ? "bg-blue-800 border-blue-800 text-white" 
                        : "border-gray-300 dark:border-gray-600 text-gray-400"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="ml-3 mr-8">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.id ? "text-blue-800 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        Étape {step.id}
                      </div>
                      <div className={`text-sm ${
                        currentStep >= step.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className={`w-5 h-5 mx-4 ${
                        currentStep > step.id ? "text-blue-800 dark:text-blue-400" : "text-gray-300 dark:text-gray-600"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                {/* Step 1: Shipping Address */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Adresse de Livraison</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Adresse *
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="123 Rue de la République"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Code Postal *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pays *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="06 12 34 56 78"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Method */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mode de Livraison</h2>
                    
                    <div className="space-y-4">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        formData.shippingMethod === "standard" 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Livraison Standard</h3>
                                <p className="text-gray-600 dark:text-gray-400">3-5 jours ouvrés</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {subtotal > 100 ? "Gratuite" : "5,99€"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        formData.shippingMethod === "express" 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === "express"}
                            onChange={handleInputChange}
                            className="mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Livraison Express</h3>
                                <p className="text-gray-600 dark:text-gray-400">24-48h</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900 dark:text-white">9,99€</div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informations de Paiement</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Numéro de Carte *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date d'Expiration *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nom sur la Carte *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-800 dark:text-green-300 font-medium">
                            Paiement 100% sécurisé SSL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Retour
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      Continuer
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitOrder}
                      disabled={isProcessing}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                        isProcessing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Traitement...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Payer {total.toFixed(2)}€
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Résumé de la Commande
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedAlternative?.id || 'main'}`} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.product.images && item.product.images[0] ? (
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-blue-800 dark:bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {(item.selectedAlternative || item.product).brand.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qté: {item.quantity} × {(item.selectedAlternative || item.product).price.toFixed(2)}€
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {((item.selectedAlternative || item.product).price * item.quantity).toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Livraison</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">Gratuite</span>
                      ) : (
                        `${shippingCost.toFixed(2)}€`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Paiement Sécurisé
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Vos données sont protégées par un cryptage SSL 256 bits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
