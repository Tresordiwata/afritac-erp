import { string } from "zod";
import { IClient } from "./client";

export type IJournalType = {
  id?: string;
  ClientId: string;
  formatJournal: string;
  libelle: string;
  Client?: IClient;
  derniereImpression?: string;
  dernierImprSydonia?:string;
  solde?: number
};

export type IJournalNumero = {
  id?: string;
  journalTypeId?: string;
  numero: BigInt;
  journalType: IJournalType;
};
