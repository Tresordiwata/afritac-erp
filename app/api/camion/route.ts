import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {
    const camions = await prisma.camion.findMany();

    return NextResponse.json(camions, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const { libelle } = await Request.json();

  try {
    let ajout = null;
    const isExist = await prisma.camion.findFirst({
      where: {
        libelle: libelle.trim(),
      },
    });

    if (isExist) {
      ajout = {
        isExist: true,
        data:isExist
      };
    } else {
      const data = await prisma.camion.create({
        data: {
          libelle: libelle,
        },
      });

      ajout = {
        isExist: false,
        data: data,
      };
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
