import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(Request) {
  try {
    const data=await prisma.paiement.findMany({
      orderBy:{
        datePaiement:"desc"
      },
      where: {
        archived:false,
        status:"A"
      },include:{
        client:true
      }
    })
    return NextResponse.json(data, { status: 201 });
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
  const {action,id} = await Request.json();
  
  try {
    let req={}
    if(action=="archive"){
      req=await prisma.paiement.update({
        data:{
          archived:true
        },
        where:{
          id:id
        }
      })
    }
    return NextResponse.json(req, { status: 201 });
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
