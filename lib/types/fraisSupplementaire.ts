import { IJournalType } from "./journalType";

export type IFraisSupplementaire = {
  id: string;
  createdAt: string;
  vehicule: string;
  montant: number;
  devise: string;
  isFactured: boolean;
  journalTypeId: string;
  journalType: IJournalType;
};
