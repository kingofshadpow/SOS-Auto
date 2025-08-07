"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { MessageCircle, Car, Wrench, CheckCircle, ArrowRight, Phone, Mail, Calendar, ArrowLeft } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useRouter } from "next/navigation"

interface VehicleInfo {
  brand: string
  model: string
  year: string
  engine: string
  vin: string
}

interface ExpertConsultation {
  vehicleInfo: VehicleInfo
  requestedPart: string
  description: string
  urgency: "low" | "medium" | "high"
  contactMethod: "phone" | "email" | "appointment"
  contactInfo: string
}

export default function ExpertSearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("product")
  const productName = searchParams.get("name")

  const [step, setStep] = useState(1)
  const [consultation, setConsultation] = useState<ExpertConsultation>({
    vehicleInfo: {
      brand: "",
      model: "",
      year: "",
      engine: "",
      vin: "",
    },
    requestedPart: productName || "",
    description: "",
    urgency: "medium",
    contactMethod: "phone",
    contactInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const vehicleBrands = [
    "Renault",
    "Peugeot",
    "Citroën",
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Toyota",
    "Nissan",
    "Ford",
    "Opel",
    "Fiat",
  ]

  const handleVehicleInfoChange = (field: keyof VehicleInfo, value: string) => {
    setConsultation((prev) => ({
      ...prev,
      vehicleInfo: { ...prev.vehicleInfo, [field]: value },
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleGoBack = () => {
    router.back()
  }

  const canProceedToStep2 =
    consultation.vehicleInfo.brand && consultation.vehicleInfo.model && consultation.vehicleInfo.year
  const canProceedToStep3 = consultation.requestedPart && consultation.description
  const canSubmit = consultation.contactInfo && consultation.contactMethod

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Demande Envoyée avec Succès !</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Nos experts vont analyser votre demande et vous contacter dans les plus brefs délais.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Prochaines Étapes :</h3>
                <ul className="text-left text-blue-800 dark:text-blue-400 space-y-2">
                  <li>• Analyse de compatibilité par nos experts (30 min)</li>
                  <li>
                    • Contact selon votre préférence (
                    {consultation.contactMethod === "phone"
                      ? "Téléphone"
                      : consultation.contactMethod === "email"
                        ? "Email"
                        : "Rendez-vous"}
                    )
                  </li>
                  <li>• Proposition de solutions adaptées</li>
                  <li>• Commande et livraison rapide</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push("/catalog")}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold smooth-hover"
                >
                  Retour au Catalogue
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold smooth-hover"
                >
                  Accueil
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 mb-6 smooth-hover"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Recherche Expert</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nos experts vous aident à trouver la pièce parfaite pour votre véhicule
            </p>
            {productName && (
              <div className="mt-4 inline-flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-lg">
                <Wrench className="w-5 h-5 mr-2" />
                Pièce demandée: {productName}
              </div>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= stepNumber
                        ? "bg-blue-800 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <ArrowRight
                      className={`w-5 h-5 mx-2 transition-colors duration-300 ${
                        step > stepNumber ? "text-blue-800" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {/* Step content remains the same but without loading animations */}
            {step === 1 && (
              <div>
                <div className="flex items-center mb-6">
                  <Car className="w-6 h-6 text-blue-800 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Informations sur votre Véhicule</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marque *</label>
                    <select
                      value={consultation.vehicleInfo.brand}
                      onChange={(e) => handleVehicleInfoChange("brand", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    >
                      <option value="">Sélectionnez une marque</option>
                      {vehicleBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modèle *</label>
                    <input
                      type="text"
                      value={consultation.vehicleInfo.model}
                      onChange={(e) => handleVehicleInfoChange("model", e.target.value)}
                      placeholder="Ex: Clio, 308, Série 3..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Année *</label>
                    <select
                      value={consultation.vehicleInfo.year}
                      onChange={(e) => handleVehicleInfoChange("year", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    >
                      <option value="">Sélectionnez l'année</option>
                      {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Motorisation
                    </label>
                    <input
                      type="text"
                      value={consultation.vehicleInfo.engine}
                      onChange={(e) => handleVehicleInfoChange("engine", e.target.value)}
                      placeholder="Ex: 1.5 dCi, 2.0 TDI, 320d..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro VIN (optionnel)
                    </label>
                    <input
                      type="text"
                      value={consultation.vehicleInfo.vin}
                      onChange={(e) => handleVehicleInfoChange("vin", e.target.value)}
                      placeholder="17 caractères - Ex: WVWZZZ1JZ3W386752"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Le VIN nous aide à identifier précisément votre véhicule
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                    className={`px-8 py-3 rounded-lg font-semibold smooth-hover ${
                      canProceedToStep2
                        ? "bg-blue-800 hover:bg-blue-900 text-white shadow-lg"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Steps 2 and 3 content similar but without animations */}
            {step === 2 && (
              <div>
                <div className="flex items-center mb-6">
                  <Wrench className="w-6 h-6 text-blue-800 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Détails de votre Demande</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pièce recherchée *
                    </label>
                    <input
                      type="text"
                      value={consultation.requestedPart}
                      onChange={(e) => setConsultation((prev) => ({ ...prev, requestedPart: e.target.value }))}
                      placeholder="Ex: Plaquettes de frein avant, Filtre à huile..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description du problème / besoin *
                    </label>
                    <textarea
                      value={consultation.description}
                      onChange={(e) => setConsultation((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Décrivez votre problème, les symptômes, ou précisez vos besoins..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Urgence</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "low", label: "Pas urgent", desc: "Dans la semaine" },
                        { value: "medium", label: "Modéré", desc: "2-3 jours" },
                        { value: "high", label: "Urgent", desc: "Aujourd'hui" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setConsultation((prev) => ({ ...prev, urgency: option.value as any }))}
                          className={`p-4 rounded-lg border-2 text-center smooth-hover ${
                            consultation.urgency === option.value
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white">{option.label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 smooth-hover"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedToStep3}
                    className={`px-8 py-3 rounded-lg font-semibold smooth-hover ${
                      canProceedToStep3
                        ? "bg-blue-800 hover:bg-blue-900 text-white shadow-lg"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-6 h-6 text-blue-800 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Comment vous contacter ?</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Méthode de contact préférée
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: "phone", icon: Phone, label: "Téléphone", desc: "Appel direct" },
                        { value: "email", icon: Mail, label: "Email", desc: "Réponse détaillée" },
                        { value: "appointment", icon: Calendar, label: "Rendez-vous", desc: "En personne" },
                      ].map((option) => {
                        const IconComponent = option.icon
                        return (
                          <button
                            key={option.value}
                            onClick={() => setConsultation((prev) => ({ ...prev, contactMethod: option.value as any }))}
                            className={`p-4 rounded-lg border-2 text-center smooth-hover ${
                              consultation.contactMethod === option.value
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                                : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-800 dark:text-blue-400" />
                            <div className="font-semibold text-gray-900 dark:text-white">{option.label}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{option.desc}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {consultation.contactMethod === "phone"
                        ? "Numéro de téléphone"
                        : consultation.contactMethod === "email"
                          ? "Adresse email"
                          : "Préférences de rendez-vous"}{" "}
                      *
                    </label>
                    {consultation.contactMethod === "appointment" ? (
                      <textarea
                        value={consultation.contactInfo}
                        onChange={(e) => setConsultation((prev) => ({ ...prev, contactInfo: e.target.value }))}
                        placeholder="Indiquez vos disponibilités (jours, heures) et lieu préféré..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                      />
                    ) : (
                      <input
                        type={consultation.contactMethod === "email" ? "email" : "tel"}
                        value={consultation.contactInfo}
                        onChange={(e) => setConsultation((prev) => ({ ...prev, contactInfo: e.target.value }))}
                        placeholder={consultation.contactMethod === "phone" ? "06 12 34 56 78" : "votre@email.com"}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white smooth-hover"
                      />
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Résumé de votre demande :</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Véhicule:</span> {consultation.vehicleInfo.brand}{" "}
                      {consultation.vehicleInfo.model} ({consultation.vehicleInfo.year})
                    </p>
                    <p>
                      <span className="font-medium">Pièce:</span> {consultation.requestedPart}
                    </p>
                    <p>
                      <span className="font-medium">Urgence:</span>{" "}
                      {consultation.urgency === "high"
                        ? "Urgent"
                        : consultation.urgency === "medium"
                          ? "Modéré"
                          : "Pas urgent"}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span>{" "}
                      {consultation.contactMethod === "phone"
                        ? "Téléphone"
                        : consultation.contactMethod === "email"
                          ? "Email"
                          : "Rendez-vous"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 smooth-hover"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold smooth-hover flex items-center gap-2 ${
                      canSubmit && !isSubmitting
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="minimal-spinner"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Envoyer la Demande
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
