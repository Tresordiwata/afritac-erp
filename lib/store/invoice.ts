import { create } from 'zustand';
import { IInvoice, IInvoiceStore } from '../types/invoice';

export const useInvoiceStore = create<IInvoiceStore>((set) => ({
  invoices: [],
  selectedInvoice: null,
  setInvoices:(liste:IInvoice[])=>set((state) => {return {invoices:[...liste]}}),
  addInvoice: (invoice) =>
    set((state) => {
      const newInvoice = {...invoice};
      return {
        invoices: [...state.invoices, newInvoice],
        selectedInvoice: newInvoice,
      };
    }),
  updateInvoice: (id, invoice) =>
    set((state) => ({
      invoices: state?.invoices?.map((i) =>
        i?.id === id ? { ...i, ...invoice } : i
      ),
    })),
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state?.invoices?.filter((i) => i?.id !== id),
    })),
  archiveInvoice: (id) =>
    set((state) => ({
      invoices: state?.invoices?.map((i) =>
        i?.id === id ? { ...i, archived: true } : i
      ),
    })),
  setSelectedInvoice: (invoice) =>
    set(() => ({
      selectedInvoice: invoice,
    })),
}));