import { IClient } from "@/lib/types/client";
import { IInvoice } from "@/lib/types/invoice";

export const getClients = async () => {
  const request = await fetch("/api/client");
  const result = (await request.json()) as IClient[];

  return result;
};
export const getPaiementNotArchived = async () => {
  const request = await fetch("/api/paiement/not-archived");
  const result = (await request.json()) as IInvoice[];

  return result;
};
export const getDashboardData = async () => {
  const req = await fetch("/api/paiement/dashboard");
  const res = await req.json();

  return res;
};

export const getUsers = async () => {
  const req = await fetch("/api/utilisateur/");
  const res = await req.json();

  return res;
};
