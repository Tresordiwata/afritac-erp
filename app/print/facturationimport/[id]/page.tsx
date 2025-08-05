import React from "react";

import Facturationimport from "../../Facturationimport";

import { prisma } from "@/lib/prisma";
import LayoutSecond from "@/layouts/LayoutSecond";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fact = await prisma.factureImport.findUnique({
    where: {
      id: id,
    },
    include: {
      camion: true,
      journalType: {
        include: { Client: true },
      },
      detailFacture: true,
      marchandise: true,
    },
  });

  const rubriques = await prisma.rubriqueFacture.findMany({
    select: {
      id: true,
      compte: true,
      compteAnalytique: true,
      identifiant: true,
      libelle: true,
      produit: true,
    },
  });

  return (
    <LayoutSecond titre={`${fact?.numeroFacture}`}>
      <Facturationimport facture={fact} rubriquesFact={rubriques} />
    </LayoutSecond>
  );
}
