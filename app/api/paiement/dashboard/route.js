import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(Request) {
  try {
    const archiveds=await prisma.paiement.findMany({
        where:{
            archived:true,
            status:'A'
        },include:{client:true}
    })
    const not_archiveds=await prisma.paiement.findMany({
        where:{
            archived:false,
            status:'A'
        }
    })
    const all=await prisma.paiement.findMany({
        where:{
            status:'A'
        }
    })
    return NextResponse.json({all:all,archiveds:archiveds,not_archiveds:not_archiveds}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}

export async function PUT(Request) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}

export async function DELETE(Request) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}
