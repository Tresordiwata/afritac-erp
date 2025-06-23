import { IJournalType } from "@/lib/types/journalType";

export const getJournalTypes = async () => {
  let response: IJournalType[] = [];

  const requete = await fetch("/api/journalType");

  if (requete.status != 201) {
    response = [];
  } else {
    response = (await requete.json()) as IJournalType[];
  }

  return await response;
};
