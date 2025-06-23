import { IClient } from "@/lib/types/client";

export async function getClients(): Promise<IClient[]> {
  const requete = await fetch("/api/client");
  const requeteState = await requete.json();

  if (!requete.ok) {
    return [] as IClient[];
  }

  return (await requeteState) as IClient[];
}
export const getClients2 = async () => {
  let response: IClient[] = [];

  const requete = await fetch("/api/client");

  if (requete.status != 201) {
    response = [];
  } else {
    response = (await requete.json()) as IClient[];
  }

  return await response;
};
