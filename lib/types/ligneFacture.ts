import { IRubriqueFacture } from "./rubriqueFacture";

export type ILigneFacture = {
  id?: string;
  rubriqueId: string;
  rubrique?: IRubriqueFacture;
  quantite: number;
  prix: number;
};
