import { Client } from "./client";

export interface IInvoice {
  id?: number;
  montant: number;
  client: Client;
  motif?: string;
  datePaiement: Date;
  createdAt: Date;
  archived?: boolean;
  numeroInvoice? : string
}

export type IInvoiceStore = {
  invoices: IInvoice[];
  selectedInvoice: IInvoice | null;
  addInvoice: (invoice: IInvoice) => void;
  updateInvoice: (id: number, invoice: Partial<IInvoice>) => void;
  deleteInvoice: (id: number | undefined) => void;
  archiveInvoice: (id: number) => void;
  setSelectedInvoice: (invoice: IInvoice | null) => void;
}