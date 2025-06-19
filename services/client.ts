import { IClient } from "@/lib/types/client";

export async function getClients(): Promise<IClient[]> {
  const requete = await fetch("/api/client");
  const requeteState = await requete.json();

  if (!requete.ok) {
    return [] as IClient[];
  }

  return (await requeteState) as IClient[];
}
