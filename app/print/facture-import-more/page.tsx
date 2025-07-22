import React from "react";

import FacturationimportMore from "../FacturationimportMore";

import LayoutSecond from "@/layouts/LayoutSecond";
import { prisma } from "@/lib/prisma";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const parametres: any = await searchParams;
  const detailParams = JSON.parse(parametres?.params);
  const { client, dateFrom, dateEnd } = detailParams;

  let factures: any = [];

  try {
    if (client == "*") {
      factures = await prisma.factureImport.findMany({
        include: {
          journalType: {
            include: {
              Client: true,
            },
          },
          camion: true,
          marchandise: true,
        },
        where: {
          dateFacture: {
            gte: new Date(dateFrom),
            lte: new Date(dateEnd),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      factures = await prisma.factureImport.findMany({
        include: {
          journalType: {
            include: {
              Client: true,
            },
          },
          camion: true,
          marchandise: true,
        },
        where: {
          dateFacture: {
            gte: new Date(dateFrom),
            lte: new Date(dateEnd),
          },
          AND: {
            journalTypeId: client,
          },
        },
      });
    }
  } catch (error: any) {}

  return (
    <LayoutSecond titre={"Impression import"}>
      <FacturationimportMore factures={factures} />
    </LayoutSecond>
  );
}
