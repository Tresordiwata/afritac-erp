import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const allFrais=await prisma.fraisSupplementaire.findMany({
      include:{
        journalType:true
      },
      orderBy:{
        createdAt:"desc"
      }
    })
    return NextResponse.json(allFrais, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const {client,montant,devise,camion} = await Request.json();

  try {
      const ajoutData=await prisma.fraisSupplementaire.create({
        data:{
          devise:devise,
          montant: parseFloat(montant),
          journalTypeId:client,
          vehicule:camion
        }
      })
    return NextResponse.json(ajoutData, { status: 201 });
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
