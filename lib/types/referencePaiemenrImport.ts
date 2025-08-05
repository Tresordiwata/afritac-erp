import { IJournalType } from "./journalType";

export type IReferencePaiementImport = {
  id?: String;
  createdAt: string;
  journalTypeId?: string;
  journalType?: IJournalType;
  libelle: string;
  montant: number;
  datereReference: string;
  description?: String;
};
