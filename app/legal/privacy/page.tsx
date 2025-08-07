"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Politique de Confidentialité
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Collecte des données personnelles</h2>
              <p>
                SOS Pièce Auto collecte des données personnelles lors de la création de votre compte, de vos commandes, 
                et de vos interactions avec notre site web. Ces données incluent notamment : nom, prénom, adresse email, 
                adresse postale, numéro de téléphone, et informations de paiement.
              </p>

              <h2>2. Finalités du traitement</h2>
              <p>
                Vos données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul>
                <li>Gestion de votre compte client</li>
                <li>Traitement et suivi de vos commandes</li>
                <li>Service client et support technique</li>
                <li>Envoi d'informations commerciales (avec votre consentement)</li>
                <li>Amélioration de nos services</li>
                <li>Respect de nos obligations légales</li>
              </ul>

              <h2>3. Base légale du traitement</h2>
              <p>
                Le traitement de vos données personnelles repose sur :
              </p>
              <ul>
                <li>L'exécution du contrat de vente</li>
                <li>Votre consentement pour les communications marketing</li>
                <li>L'intérêt légitime de SOS Pièce Auto pour l'amélioration de ses services</li>
                <li>Le respect d'obligations légales</li>
              </ul>

              <h2>4. Destinataires des données</h2>
              <p>
                Vos données personnelles peuvent être communiquées à :
              </p>
              <ul>
                <li>Nos prestataires de services (livraison, paiement, hébergement)</li>
                <li>Nos partenaires commerciaux (avec votre consentement)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>

              <h2>5. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles 
                elles ont été collectées :
              </p>
              <ul>
                <li>Données de compte : jusqu'à suppression du compte + 3 ans</li>
                <li>Données de commande : 10 ans (obligations comptables)</li>
                <li>Données marketing : jusqu'à retrait du consentement + 3 ans</li>
              </ul>

              <h2>6. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul>
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement</li>
              </ul>

              <h2>7. Sécurité des données</h2>
              <p>
                SOS Pièce Auto met en œuvre toutes les mesures techniques et organisationnelles appropriées pour 
                protéger vos données personnelles contre la destruction, la perte, l'altération, la divulgation ou 
                l'accès non autorisé.
              </p>

              <h2>8. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos 
                préférences de cookies via notre bandeau de consentement ou les paramètres de votre navigateur.
              </p>

              <h2>9. Contact</h2>
              <p>
                Pour exercer vos droits ou pour toute question relative à cette politique de confidentialité, 
                vous pouvez nous contacter :
              </p>
              <ul>
                <li>Par email : dpo@sospiece-auto.fr</li>
                <li>Par courrier : SOS Pièce Auto - DPO, 123 Rue de l'Automobile, 75001 Paris</li>
                <li>Par téléphone : +33 1 23 45 67 89</li>
              </ul>

              <h2>10. Réclamation</h2>
              <p>
                Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, 
                vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de 
                l'Informatique et des Libertés).
              </p>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dernière mise à jour : 15 janvier 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
