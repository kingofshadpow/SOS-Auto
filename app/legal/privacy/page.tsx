"use client"

import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Dernière mise à jour : 1er janvier 2024
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SOS Pièce Auto SARL s'engage à protéger la confidentialité et la sécurité des données 
                  personnelles de ses utilisateurs. Cette politique explique comment nous collectons, 
                  utilisons et protégeons vos informations personnelles.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) 
                  et à la loi Informatique et Libertés.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Responsable du traitement
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Responsable :</strong> SOS Pièce Auto SARL</p>
                  <p><strong>Adresse :</strong> 123 Avenue des Pièces Auto, 94200 Ivry-sur-Seine</p>
                  <p><strong>Email :</strong> dpo@sospieceauto.fr</p>
                  <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Données collectées
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nous collectons les données suivantes :
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Données d'identification
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Adresse postale</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Données de navigation
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Adresse IP</li>
                      <li>Type de navigateur</li>
                      <li>Pages visitées</li>
                      <li>Durée de visite</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Données de commande
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Historique des commandes</li>
                      <li>Préférences de produits</li>
                      <li>Informations de paiement (cryptées)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Finalités du traitement
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Traiter et livrer vos commandes</li>
                  <li>Gérer votre compte client</li>
                  <li>Vous contacter concernant vos commandes</li>
                  <li>Améliorer nos services</li>
                  <li>Vous envoyer des offres commerciales (avec votre consentement)</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Base légale du traitement
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Exécution du contrat
                    </h3>
                    <p>Traitement de vos commandes et gestion de votre compte</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Intérêt légitime
                    </h3>
                    <p>Amélioration de nos services et sécurité du site</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Consentement
                    </h3>
                    <p>Envoi de communications marketing</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Partage des données
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Nos prestataires de services (livraison, paiement)</li>
                  <li>Nos partenaires techniques (hébergement, maintenance)</li>
                  <li>Les autorités compétentes si requis par la loi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Durée de conservation
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Données de compte :</strong> Jusqu'à suppression du compte + 3 ans</p>
                  <p><strong>Données de commande :</strong> 10 ans (obligations comptables)</p>
                  <p><strong>Données de navigation :</strong> 13 mois maximum</p>
                  <p><strong>Données marketing :</strong> 3 ans après le dernier contact</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Vos droits
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Droit d'accès :</strong> Connaître les données que nous détenons sur vous</li>
                  <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> Supprimer vos données dans certains cas</li>
                  <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                  <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Pour exercer ces droits, contactez-nous à : dpo@sospieceauto.fr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Sécurité des données
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nous mettons en place des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Chiffrement des données sensibles</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>Formation du personnel à la protection des données</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer 
                  vos préférences de cookies via notre bandeau de consentement.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Pour plus d'informations, consultez notre politique de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Contact et réclamations
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Pour toute question concernant cette politique ou pour exercer vos droits :
                </p>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>Email :</strong> dpo@sospieceauto.fr</p>
                  <p><strong>Courrier :</strong> SOS Pièce Auto - DPO, 123 Avenue des Pièces Auto, 94200 Ivry-sur-Seine</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Vous avez également le droit de déposer une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
