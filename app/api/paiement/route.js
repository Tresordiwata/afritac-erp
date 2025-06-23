import { NextResponse } from "next/server";
import moment from "moment/moment";

import { prisma } from "@/lib/prisma";

export async function GET(Request) {
  try {
    const invoices = await prisma.paiement.findMany({
      where: {
        NOT: {
          status: "D",
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ id: invoices }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request) {
  const { client, date, montant, motif } = await Request.json();

  try {
    const currentAnnee = moment().format("YYYY");
    const nextAnnee = moment().add(1, "year").format("YYYY");
    const currentAnneeFormatted = moment().format("YY");

    const numerFact = await prisma.paiement.findMany({
      where: {
        datePaiement: {
          gte: new Date(`${currentAnnee}-01-01T00:00:00.000Z`),
          lt: new Date(`${nextAnnee}-01-01T00:00:00.000Z`),
        },
      },
    });
    const newNumber = `${numerFact.length + 1}/${currentAnneeFormatted}`;
    const transaction = await prisma.paiement.create({
      data: {
        idClient: parseInt(client),
        datePaiement: date,
        montant: parseFloat(montant),
        motif: motif,
        numeroInvoice: newNumber,
      },
      select: {
        id: true,
        client: true,
        montant: true,
        datePaiement: true,
        motif: true,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function PUT(Request) {
  const { action, id } = await Request.json();

  try {
    let req = {};

    if (action == "archive") {
      req = await prisma.paiement.update({
        data: {
          archived: true,
        },
        where: {
          id: id,
        },
      });
    }

    return NextResponse.json(req, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}

export async function DELETE(Request) {
  const { id } = await Request.json();

  try {
    const req = await prisma.paiement.update({
      data: {
        status: "D",
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json(req, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}
