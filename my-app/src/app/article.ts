export interface Article{
    id: number;
    titre: string;
    texte: string;
    
    
    matiere: string[]; //cotton / acrylique / laine ...
    matiereID: number[];
    categorie: string; //Animal / Perso / ...
    categorieID: number;
    porteClef: boolean;

    dispo: string; //1 = Oui / 2 = Non / 3 = Sur commande
    prix: number;

    image: string[];
    descriptionImg: string[];
  
    dateCreation: Date;
}