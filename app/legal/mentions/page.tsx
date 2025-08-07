"use client"

import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

export default function LegalMentionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mentions Légales
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Informations légales concernant le site SOS Pièce Auto
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Informations sur l'entreprise
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Dénomination sociale :</strong> SOS Pièce Auto SARL</p>
                  <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</p>
                  <p><strong>Capital social :</strong> 50 000 euros</p>
                  <p><strong>Siège social :</strong> 123 Avenue des Pièces Auto, 94200 Ivry-sur-Seine, France</p>
                  <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  <p><strong>SIREN :</strong> 123 456 789</p>
                  <p><strong>Code APE :</strong> 4532Z (Commerce de détail d'équipements automobiles)</p>
                  <p><strong>Numéro TVA intracommunautaire :</strong> FR12123456789</p>
                  <p><strong>RCS :</strong> Créteil B 123 456 789</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Contact
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                  <p><strong>Email :</strong> contact@sospieceauto.fr</p>
                  <p><strong>Horaires d'ouverture :</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Lundi au Vendredi : 8h00 - 18h00</li>
                    <li>Samedi : 9h00 - 17h00</li>
                    <li>Dimanche : Fermé</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Direction et représentants légaux
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Gérant :</strong> Pierre Dubois</p>
                  <p><strong>Directeur de la publication :</strong> Pierre Dubois</p>
                  <p><strong>Responsable éditorial :</strong> Marie Leroy</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Hébergement du site
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site web :</strong> https://vercel.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Propriété intellectuelle
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  L'ensemble des éléments composant le site SOS Pièce Auto (textes, images, vidéos, logos, 
                  icônes, sons, logiciels, etc.) ainsi que le site lui-même, sont protégés par les lois en 
                  vigueur sur la propriété intellectuelle.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Ces éléments sont la propriété exclusive de SOS Pièce Auto SARL, à l'exception des marques, 
                  logos ou contenus appartenant à d'autres sociétés partenaires ou tiers.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf 
                  autorisation écrite préalable de SOS Pièce Auto SARL.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Données personnelles
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé 
                  par SOS Pièce Auto SARL pour la gestion des commandes et la relation client.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Conformément à la loi « informatique et libertés » et au RGPD, vous pouvez exercer votre 
                  droit d'accès aux données vous concernant et les faire rectifier en contactant : 
                  dpo@sospieceauto.fr
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Pour plus d'informations, consultez notre politique de confidentialité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Cookies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des 
                  statistiques de visite. Ces cookies ne contiennent aucune information personnelle et 
                  ne peuvent pas être utilisés pour identifier l'utilisateur.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  L'utilisateur peut désactiver les cookies dans les paramètres de son navigateur, 
                  cependant cela peut affecter le bon fonctionnement du site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Responsabilité
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SOS Pièce Auto SARL s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la 
                  mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de 
                  corriger, à tout moment et sans préavis, le contenu.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Toutefois, SOS Pièce Auto SARL ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                  des informations mises à disposition sur ce site.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  En conséquence, SOS Pièce Auto SARL décline toute responsabilité pour toute imprécision, 
                  inexactitude ou omission portant sur des informations disponibles sur le site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Droit applicable
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Le présent site et les présentes mentions légales sont régis par le droit français.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Médiation
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Conformément aux dispositions du Code de la consommation concernant le règlement amiable 
                  des litiges, SOS Pièce Auto SARL adhère au Service du Médiateur du e-commerce de la FEVAD 
                  (Fédération du e-commerce et de la vente à distance).
                </p>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>Médiateur :</strong> FEVAD</p>
                  <p><strong>Site web :</strong> https://www.mediateurfevad.fr</p>
                  <p><strong>Email :</strong> mediateur@fevad.fr</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Crédits
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>Conception et développement :</strong> Équipe SOS Pièce Auto</p>
                  <p><strong>Design graphique :</strong> Studio Design Auto</p>
                  <p><strong>Photographies :</strong> Banque d'images libres de droits</p>
                  <p><strong>Icônes :</strong> Lucide React (Licence MIT)</p>
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
