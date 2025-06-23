import { IJournalNumero } from "@/lib/types/journalType";

export const getJournalNumeros = async () => {
  let response: IJournalNumero[] = [];

  const requete = await fetch("/api/journalNumero");

  if (requete.status != 201) {
    response = [];
  } else {
    response = (await requete.json()) as IJournalNumero[];
  }

  return await response;
};
