import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {

   const factures = await prisma.factureImport.findMany({
        include: {
          journalType: true,
          camion:true,
          marchandise:true
        },
        orderBy: {
          createdAt:"desc",
        },
        take:50
      });

    return NextResponse.json(factures, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const { client, dateFrom, dateEnd } = await Request.json();
  let factures: any = [];

  try {
    if (client == "*") {
      factures = await prisma.factureImport.findMany({
        include: {
          journalType: true,
          camion:true,
          marchandise:true
        },
        where: {
          dateFacture: {
            gte: new Date(dateFrom),
            lte: new Date(dateEnd),
          },
        },
        orderBy: {
          createdAt:"desc",
        },
      });
    } else {
      factures = await prisma.factureImport.findMany({
        include: {
          journalType: true,
          camion:true,
          marchandise:true
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

    return NextResponse.json(factures, { status: 201 });
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
