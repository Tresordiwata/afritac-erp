import { IFraisSupplementaire } from "@/lib/types/fraisSupplementaire";

export async function getFraisSupplementaires(): Promise<
  IFraisSupplementaire[]
> {
  const requete = await fetch("/api/frais-supplementaire");
  const requeteState = await requete.json();

  if (!requete.ok) {
    return [] as IFraisSupplementaire[];
  }

  return (await requeteState) as IFraisSupplementaire[];
}
export const getFraisSupplementaires2 = async () => {
  let response: IFraisSupplementaire[] = [];

  const requete = await fetch("/api/frais-supplementaire");

  if (requete.status != 201) {
    response = [];
  } else {
    response = (await requete.json()) as IFraisSupplementaire[];
  }

  return await response;
};
