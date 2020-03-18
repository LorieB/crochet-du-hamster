import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  questions = [
    {
    quest: "Comment passer commande ?",
    rep: "Pour passer une commande vous pouvez envoyer un mail, ou me contacter sur les réseaux sociaux.\n\rSi c'est une peluche existante pensez à me dire laquelle.\n\rSi c'est une commande spéciale il est important de bien la détailler : modèle déjà existant ou nouvelle peluche, taille, couleur, etc.\n\rPlus un nom et une adresse pour la livraison."
  },
  {
    quest: "Quels sont les délais d'envoi ?",
    rep: "Les peluches disponibles sont postées en 1 à 3 jours.\n\rCelles sur commandes ont un temps de fabrication de généralement 2 semaines"
  },
  {
    quest: "Quelle méthode de paiement ?",
    rep: "Pour l'instant uniquement Paypal"
  },
  {
    quest: "De combien sont les frais de port ?",
    rep: "Les frais de port sont inclus dans le prix des peluches pour un envoi en France métropolitaine.\n\rPour les autres destinations il y aura un supplément à calculer selon le pays. Dans ce cas n'hésitez pas à regarder sur le site de la poste ou à me poser la question"
  },
  {
    quest: "Les prix sont-ils négociables ?",
    rep: "Non"
  },
  {
    quest: "Avec quoi les peluches sont-elles rembourrées ?",
    rep: "Un rembourrage spécial pour coussins, oreillers, jouets. \n\rComposé de fibre de polyester"
  },
  {
    quest: "Peut-on laver les peluches ?",
    rep: "Oui la plupart, mais certaines sont trop fragiles (notamment s'il y a un pompon ou de petits éléments cousus)\n\rUn lavage à la main est à privilégier.\n\rEn cas d'utilisation du lave-linge utiliser un programme doux et 30°c maximum, limiter aussi la vitesse d'essorage.\n\rPas de sèche-linge.\n\rA ne pas faire trop souvent."
  },
  {
    quest: "L'environnement de création est-il fumeur, y a-t-il des animaux ?",
    rep: "L'environnement est non-fumeur et non-vapoteur.\n\rIl n'y a pas de présence de moisissure.\n\rLe lieu n'est pas parfumé (encens, huiles essentielles, etc)\n\rIl y a deux chinchillas donc possible présence de quelques poils ou micro bout de foin."
  },
  {
    quest: "Est-ce que les peluches conviennent pour des enfants ?",
    rep: "Pas pour les tout petits.\n\rJe ne peux pas garantir la solidité des peluches face à un mâchouillage par un bébé."
  }
]

  constructor() { }

  ngOnInit(): void {
  }

}
