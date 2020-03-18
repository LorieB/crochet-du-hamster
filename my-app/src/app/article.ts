export interface Article{
    id: number;
    titre: string;
    texte: string;
    
    
    matiere: string[]; //cotton / acrylique / laine ...
    categorie: string; //Animal / Perso / ...
    porteClef: boolean;

    dispo: String; //Oui / Non / Sur commande
    prix: number;

    image: string[];
    descriptionImg: string[];
  
    dateCreation: Date;
}