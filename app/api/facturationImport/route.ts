import { NextResponse, NextRequest } from "next/server";
import moment from "moment";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const {
    manifeste,
    typeFact,
    camionId,
    niveauSaisie,
    montant,
    colis,
    dateFacture,
    declarationDate,
    declarationId,
    dossier,
    journalTypeId,
    liquidationId,
    liquidationDate,
    marchandiseId,
    poids,
    quittanceDate,
    quittanceId,
    quittanceMontant,
    t1,
  } = await Request.json();

  //   const fact: IFactureImport = {
  //     createdAt: "",
  //     id: "",
  //     manifest: "",
  //     typeFact: typeFact,
  //     camionId: camionId,
  //     colis: "",
  //     dateFacture: "",
  //     declarationDate: "",
  //     declarationId: "",
  //     dossier: "",
  //     journalTypeId: "",
  //     liquidationDate: "",
  //     liquidationId: "",
  //     marchandiseId: "",
  //     montant: montant,
  //     niveauSaisie: niveauSaisie,
  //     numeroFacture: "",
  //     poids: "",
  //     quittanceDate: "",
  //     quittanceId: "",
  //     quittanceMontant: "",
  //     status: "C",
  //     t1: "",
  //   };
  try {
    const numeroFacture = await prisma.journal.findFirst({
      include: {
        journalType: true,
      },
      where: {
        id: journalTypeId,
      },
    });
    const newNumero:any = numeroFacture?.numero || 0 + 1;

    await prisma.journal.update({
      data: {
        numero: {
          increment: 1,
        },
      },
      where: {
        id: journalTypeId,
      },
    });

    const items: string[] = numeroFacture?.journalType?.formatJournal.split(
      "-",
    ) as string[];
    const f =
      moment().format("YYYY") +
      "-" +
      moment().format("MM") +
      "-" +
      items[2] +
      "-" +
      items[3] +
      "-" +
      items[4] +
      "-" +
      newNumero;

    const insertion = await prisma.factureImport.create({
      data: {
        manifeste: manifeste,
        typeFact: typeFact,
        camionId: camionId,
        colis: colis,
        dateFacture: new Date(moment().format("YYYY-MM-DD")),
        declarationDate: new Date(declarationDate),
        declarationId: declarationId,
        dossier: dossier,
        journalTypeId: numeroFacture?.journalType?.id,
        liquidationDate: new Date(liquidationDate),
        liquidationId: liquidationId,
        marchandiseId: marchandiseId,
        montant: parseFloat(montant),
        niveauSaisie: niveauSaisie,
        numeroFacture: f,
        poids: poids,
        quittanceDate: new Date(quittanceDate),
        quittanceId: quittanceId,
        quittanceMontant: parseFloat(quittanceMontant),
        status: "C",
        t1: t1,
      },
    });

    return NextResponse.json({ facture: insertion }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function PUT(Request: NextRequest) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function DELETE(Request: NextRequest) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}
