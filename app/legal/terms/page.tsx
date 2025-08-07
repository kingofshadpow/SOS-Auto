"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Conditions Générales de Vente
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>Article 1 - Objet</h2>
              <p>
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre SOS Pièce Auto, 
                société par actions simplifiée au capital de 50 000 euros, immatriculée au RCS de Paris sous le numéro 
                123 456 789, dont le siège social est situé 123 Rue de l'Automobile, 75001 Paris, et ses clients.
              </p>

              <h2>Article 2 - Produits</h2>
              <p>
                SOS Pièce Auto propose à la vente des pièces automobiles neuves et d'occasion, des accessoires et des 
                équipements pour véhicules. Les produits proposés sont ceux qui figurent sur le site internet au jour de 
                la consultation par l'acheteur et dans la limite des stocks disponibles.
              </p>

              <h2>Article 3 - Prix</h2>
              <p>
                Les prix sont indiqués en euros toutes taxes comprises (TTC). Ils s'entendent hors frais de livraison qui 
                sont facturés en supplément selon les modalités indiquées sur le site. SOS Pièce Auto se réserve le droit 
                de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la 
                commande sera le seul applicable à l'acheteur.
              </p>

              <h2>Article 4 - Commandes</h2>
              <p>
                Les commandes peuvent être passées sur le site internet www.sospiece-auto.fr ou par téléphone au 
                +33 1 23 45 67 89. Toute commande implique l'acceptation pleine et entière des présentes conditions 
                générales de vente. La vente ne sera considérée comme définitive qu'après envoi à l'acheteur de la 
                confirmation de l'acceptation de la commande par SOS Pièce Auto.
              </p>

              <h2>Article 5 - Paiement</h2>
              <p>
                Le paiement s'effectue par carte bancaire, virement bancaire ou chèque. En cas de paiement par carte 
                bancaire, le débit s'effectue au moment de l'expédition de la commande. En cas de paiement par chèque, 
                la commande ne sera expédiée qu'après encaissement du chèque.
              </p>

              <h2>Article 6 - Livraison</h2>
              <p>
                Les livraisons sont effectuées à l'adresse indiquée par l'acheteur lors de sa commande. Les délais de 
                livraison sont donnés à titre indicatif et ne sont pas garantis. En cas de retard de livraison, l'acheteur 
                pourra annuler sa commande dans les conditions prévues par la loi.
              </p>

              <h2>Article 7 - Garanties</h2>
              <p>
                Tous nos produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. 
                En outre, certains produits peuvent bénéficier d'une garantie commerciale spécifique dont les modalités 
                sont précisées sur la fiche produit.
              </p>

              <h2>Article 8 - Droit de rétractation</h2>
              <p>
                Conformément aux dispositions du Code de la consommation, l'acheteur dispose d'un délai de 14 jours 
                francs pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités, 
                à l'exception des frais de retour.
              </p>

              <h2>Article 9 - Responsabilité</h2>
              <p>
                SOS Pièce Auto ne saurait être tenue responsable de l'inexécution du contrat conclu en cas de rupture de 
                stock ou d'indisponibilité du produit, de force majeure, de perturbation ou grève totale ou partielle des 
                services postaux et moyens de transport et/ou communications.
              </p>

              <h2>Article 10 - Litiges</h2>
              <p>
                Tous les litiges auxquels les opérations d'achat et de vente conclues en application des présentes 
                conditions générales de vente pourraient donner lieu, concernant tant leur validité, leur interprétation, 
                leur exécution, leur résiliation, leurs conséquences et leurs suites, seront soumis aux tribunaux compétents 
                dans les conditions de droit commun.
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
