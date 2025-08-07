"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Mentions Légales
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>Éditeur du site</h2>
              <p>
                <strong>SOS Pièce Auto</strong><br />
                Société par Actions Simplifiée au capital de 50 000 euros<br />
                Siège social : 123 Rue de l'Automobile, 75001 Paris, France<br />
                RCS Paris : 123 456 789<br />
                SIRET : 123 456 789 00012<br />
                Code APE : 4532Z<br />
                Numéro de TVA intracommunautaire : FR12 123456789
              </p>

              <h2>Directeur de la publication</h2>
              <p>
                Jean Dupont, Président de SOS Pièce Auto
              </p>

              <h2>Contact</h2>
              <p>
                <strong>Adresse :</strong> 123 Rue de l'Automobile, 75001 Paris<br />
                <strong>Téléphone :</strong> +33 1 23 45 67 89<br />
                <strong>Email :</strong> contact@sospiece-auto.fr<br />
                <strong>Horaires :</strong> Lundi au Vendredi de 8h à 18h, Samedi de 9h à 17h
              </p>

              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>

              <h2>Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et 
                la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
                documents téléchargeables et les représentations iconographiques et photographiques.
              </p>

              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>

              <h2>Données personnelles</h2>
              <p>
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général 
                sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression 
                et d'opposition aux données personnelles vous concernant.
              </p>

              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : dpo@sospiece-auto.fr
              </p>

              <h2>Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de 
                visites. En continuant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
              </p>

              <h2>Responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à 
                différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>

              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir 
                le signaler par email, à l'adresse contact@sospiece-auto.fr, en décrivant le problème de la façon la 
                plus précise possible.
              </p>

              <h2>Liens hypertextes</h2>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres 
                ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de SOS Pièce Auto.
              </p>

              <h2>Litiges</h2>
              <p>
                Les présentes conditions du site et votre utilisation de ce site sont régies par la loi française. 
                Tout litige portant sur l'utilisation du site est soumis au droit français, et sera de la compétence 
                exclusive des tribunaux de Paris.
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
