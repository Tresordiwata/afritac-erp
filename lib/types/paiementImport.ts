import { IJournalType } from "./journalType";
import { IReferencePaiementImport } from "./referencePaiemenrImport";

export type IPaiementImport = {
  id?: string;
  createdAt?: string;
  journalTypeId: string;
  journalType: IJournalType;
  montant: number;
  justification?: string;
  fichier ?: string
  referencePaiementImportId?: string,
  referencePaiementImport ?:IReferencePaiementImport
};
