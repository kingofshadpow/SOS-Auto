"use client"

import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Objet
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du site web 
                  SOS Pièce Auto et les services proposés par la société SOS Pièce Auto SARL.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  L'utilisation du site implique l'acceptation pleine et entière des présentes CGU.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Mentions légales
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Raison sociale :</strong> SOS Pièce Auto SARL</p>
                  <p><strong>Siège social :</strong> 123 Avenue des Pièces Auto, 94200 Ivry-sur-Seine</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  <p><strong>Capital social :</strong> 50 000 €</p>
                  <p><strong>Directeur de publication :</strong> Pierre Dubois</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Accès au site
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. 
                  Tous les frais supportés par l'utilisateur pour accéder au service sont à sa charge.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  SOS Pièce Auto se réserve le droit de modifier, suspendre ou interrompre l'accès au site 
                  à tout moment sans préavis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Utilisation du site
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  L'utilisateur s'engage à utiliser le site conformément aux présentes CGU et à la législation 
                  en vigueur. Il est notamment interdit de :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Utiliser le site à des fins illégales ou non autorisées</li>
                  <li>Tenter d'accéder aux systèmes informatiques de manière non autorisée</li>
                  <li>Diffuser des contenus illicites, diffamatoires ou portant atteinte aux droits de tiers</li>
                  <li>Perturber le fonctionnement du site</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Commandes et paiements
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Les commandes passées sur le site sont soumises aux conditions générales de vente. 
                  Le paiement s'effectue par carte bancaire ou PayPal de manière sécurisée.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Les prix sont indiqués en euros TTC. SOS Pièce Auto se réserve le droit de modifier 
                  ses prix à tout moment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Propriété intellectuelle
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  L'ensemble des éléments du site (textes, images, logos, etc.) sont protégés par le droit 
                  d'auteur et appartiennent à SOS Pièce Auto ou à ses partenaires.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Toute reproduction, représentation, modification ou adaptation sans autorisation expresse 
                  est interdite.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Protection des données personnelles
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SOS Pièce Auto s'engage à protéger les données personnelles de ses utilisateurs conformément 
                  au RGPD et à la loi Informatique et Libertés.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Pour plus d'informations, consultez notre politique de confidentialité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Responsabilité
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SOS Pièce Auto met tout en œuvre pour assurer la disponibilité et la sécurité du site, 
                  mais ne peut garantir un fonctionnement sans interruption ni erreur.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  La responsabilité de SOS Pièce Auto ne saurait être engagée en cas de dommages indirects 
                  ou de perte de données.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Droit applicable et juridiction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français 
                  seront seuls compétents.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Conformément à la réglementation, l'utilisateur peut recourir à une médiation conventionnelle 
                  ou à tout autre mode alternatif de règlement des différends.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Contact
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
                </p>
                <div className="text-gray-700 dark:text-gray-300 mt-4 space-y-1">
                  <p><strong>Email :</strong> contact@sospieceauto.fr</p>
                  <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                  <p><strong>Adresse :</strong> 123 Avenue des Pièces Auto, 94200 Ivry-sur-Seine</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
