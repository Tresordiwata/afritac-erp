import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const { description, id, libelle, montant, dateReference } =
    await Request.json();

  try {
    const ajout = await prisma.referencePaiementImport.create({
      data: {
        libelle: libelle,
        dateReference: new Date(dateReference),
        description: description,
        journalTypeId: id,
        montant: parseFloat(montant),
      },
    });

    if (ajout) {
      await prisma.journalType.update({
        data: {
          solde: {
            increment: parseFloat(montant),
          },
        },
        where: {
          id: id,
        },
      });
    }

    return NextResponse.json(ajout, { status: 201 });
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
