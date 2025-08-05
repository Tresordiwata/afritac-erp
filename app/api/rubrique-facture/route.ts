import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const data=await prisma.rubriqueFacture.findMany({
        orderBy:{
            libelle:"asc"
        }
    })
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const {produit,libelle,compte,compteAnalytique,identifiant} = await Request.json();

  try {
    const ajout=await prisma.rubriqueFacture.create({
        data:{
            identifiant:identifiant,
            compte:compte,
            compteAnalytique:compteAnalytique,
            libelle:libelle,
            produit:produit
        }
    })
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
