import { IFactureImport } from "./factureImport";

export type IDetailFacture = {
  id: string;
  factureId?: string;
  facture?: IFactureImport;
  contenu: JSON;
};
