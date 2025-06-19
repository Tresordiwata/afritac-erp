import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request) {
  try {
    const clients = await prisma.client.findMany({
      where: {
        enabled: {
          not: "S",
        },
      },
    });

    return NextResponse.json(clients, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request) {
  const {
    nom_client,
    code,
    num_nif,
    adresse,
    telephone,
    email,
    isFacturedForExport,
    isFacturedForImport,
    isFacturedForTva,
    rccm,
    idnat,
  } = await Request.json();

  try {
    const client = await prisma.client.create({
      data: {
        adresse: adresse,
        code: code,
        num_nif: num_nif,
        email: email,
        telephone: telephone,
        isFacturedForExport: isFacturedForExport ? "Y" : "N",
        isFacturedForImport: isFacturedForImport ? "Y" : "N",
        isFacturedForTva: isFacturedForTva ? "Y" : "N",
        nom_client: nom_client,
        rccm: rccm,
        idNat: idnat,
      },
    });

    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 501 });
  }
}

export async function PUT(Request) {
  const {
    id,
    nom_client,
    code,
    num_nif,
    adresse,
    telephone,
    email,
    isFacturedForExport,
    isFacturedForImport,
    isFacturedForTva,
    rccm,
    idnat,
  } = await Request.json();

  try {
    const client = await prisma.client.update({
      data: {
        adresse: adresse,
        code: code,
        num_nif: num_nif,
        email: email,
        telephone: telephone,
        isFacturedForExport: isFacturedForExport ? "Y" : "N",
        isFacturedForImport: isFacturedForImport ? "Y" : "N",
        isFacturedForTva: isFacturedForTva ? "Y" : "N",
        nom_client: nom_client,
        rccm: rccm,
        idNat: idnat,
      },
      where:{
        id:id,
      }
    });

  

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}

export async function DELETE(Request) {
  const { id } = await Request.json();

  try {
    const request = await prisma.client.update({
      where: {
        id: id,
      },
      data: {
        enabled: "S",
      },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}
