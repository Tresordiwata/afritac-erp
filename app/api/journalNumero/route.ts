import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {
    const jn = await prisma.journal.findMany({
      include: {
        journalType: true,
      },
    });

    return NextResponse.json(jn, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const { journalType, numero } = await Request.json();

  try {
    const ins = await prisma.journal.create({
      data: {
        journalTypeId: journalType,
        numero: numero,
      },
    });

    return NextResponse.json(ins, { status: 201 });
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
