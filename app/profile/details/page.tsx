"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Edit, User, Mail, Phone, MapPin } from 'lucide-react'
import { useAuthStore } from "@/stores/auth-store"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProfileSidebar from "@/components/layout/profile-sidebar"

export default function ProfileDetailsPage() {
  const { user, isAuthenticated, updateProfile } = useAuthStore()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "France"
    }
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "France"
        }
      })
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    updateProfile(formData)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: {
        street: user.address?.street || "",
        city: user.address?.city || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "France"
      }
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Mes Informations
                  </h1>
                  
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isSaving
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white"
                        }`}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Sauvegarde...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Sauvegarder
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Informations Personnelles
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Prénom
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                            {user.firstName || "Non renseigné"}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nom
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                            {user.lastName || "Non renseigné"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Informations de Contact
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Adresse Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                            {user.email}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Téléphone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="06 12 34 56 78"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                            {user.phone || "Non renseigné"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Adresse
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rue
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="123 Rue de la République"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                            {user.address?.street || "Non renseigné"}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ville
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Paris"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                              {user.address?.city || "Non renseigné"}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Code Postal
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.postalCode"
                              value={formData.address.postalCode}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="75001"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                              {user.address?.postalCode || "Non renseigné"}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pays
                          </label>
                          {isEditing ? (
                            <select
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="France">France</option>
                              <option value="Belgique">Belgique</option>
                              <option value="Suisse">Suisse</option>
                              <option value="Luxembourg">Luxembourg</option>
                            </select>
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                              {user.address?.country || "Non renseigné"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
