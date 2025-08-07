"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, CreditCard, Truck, MapPin } from 'lucide-react'
import { useCatalogStore } from '@/stores/catalog-store'
import { useAuthStore } from '@/stores/auth-store'
import { useOrderStore } from '@/stores/order-store'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import Image from 'next/image'

type CheckoutStep = 'shipping' | 'delivery' | 'payment'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [isLoading, setIsLoading] = useState(false)
  const { cart, clearCart } = useCatalogStore()
  const { user, isAuthenticated } = useAuthStore()
  const { createOrder } = useOrderStore()
  const router = useRouter()

  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'France'
  })

  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shippingCost = deliveryMethod === 'express' ? 15.90 : (subtotal > 100 ? 0 : 8.90)
  const total = subtotal + shippingCost

  // Redirect if cart is empty or user not authenticated
  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleStepComplete = (step: CheckoutStep) => {
    switch (step) {
      case 'shipping':
        setCurrentStep('delivery')
        break
      case 'delivery':
        setCurrentStep('payment')
        break
      case 'payment':
        handleOrderSubmit()
        break
    }
  }

  const handleOrderSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderId = createOrder({
        userId: user!.id,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand
        })),
        subtotal,
        shipping: shippingCost,
        total,
        status: 'confirmed',
        shippingAddress: shippingData,
        paymentMethod: paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'
      })
      
      clearCart()
      router.push(`/order-confirmation?orderId=${orderId}`)
    } catch (error) {
      console.error('Order submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { id: 'shipping', name: 'Adresse de livraison', icon: MapPin },
    { id: 'delivery', name: 'Mode de livraison', icon: Truck },
    { id: 'payment', name: 'Paiement', icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/cart')}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au panier
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Finaliser ma commande
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index
                const Icon = step.icon
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
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
              {/* Shipping Address Step */}
              {currentStep === 'shipping' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Adresse de livraison
                  </h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); handleStepComplete('shipping'); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.street}
                        onChange={(e) => setShippingData(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Rue de la Paix"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Code postal
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="75001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.city}
                          onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Paris"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) => setShippingData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Continuer vers la livraison
                    </button>
                  </form>
                </div>
              )}

              {/* Delivery Method Step */}
              {currentStep === 'delivery' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Mode de livraison
                  </h2>
                  
                  <div className="space-y-4">
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        deliveryMethod === 'standard' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                      onClick={() => setDeliveryMethod('standard')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Livraison standard
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            3-5 jours ouvrés
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {subtotal > 100 ? 'Gratuit' : '8,90 €'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        deliveryMethod === 'express' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                      onClick={() => setDeliveryMethod('express')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Livraison express
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            24-48h
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            15,90 €
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStepComplete('delivery')}
                    className="w-full mt-6 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Informations de paiement
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Carte bancaire
                          </span>
                        </div>
                      </div>

                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'paypal' 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            P
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            PayPal
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Details Form (only show if card is selected) */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Numéro de carte
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Date d'expiration
                            </label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nom sur la carte
                          </label>
                          <input
                            type="text"
                            placeholder="Jean Dupont"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleStepComplete('payment')}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? 'Traitement en cours...' : `Payer ${total.toFixed(2)} €`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Résumé de la commande
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Qté: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {subtotal.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {shippingCost === 0 ? 'Gratuit' : `${shippingCost.toFixed(2)} €`}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-600 pt-3">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
