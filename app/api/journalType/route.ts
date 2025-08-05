import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const jt=await prisma.journalType.findMany({
      include:{
        Client:true
      },
      orderBy:{
        libelle:"asc"
      }
    })
    return NextResponse.json(jt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const {client,formatJournal,libelle} = await Request.json();

  try {
    const fj=formatJournal.split("-");
    const insert=await prisma.journalType.create({
      data:{
        formatJournal:formatJournal,
        libelle:libelle.toString(),
        ClientId:client.toString()
      }
    })
    return NextResponse.json(insert, { status: 201 });
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
