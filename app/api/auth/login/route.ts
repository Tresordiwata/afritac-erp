/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function GET(Request: NextRequest) {
  try {
    return NextResponse.json({"e":1}, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request: NextRequest) {
  const {login,pwd} = await Request.json();

  try {
    const user=await prisma.utilisateur.findFirst({
      where:{
        login:login,
        password:pwd
      },
      omit:{
        password:true,
      }
    })

    if(user)
    {
      const c=await cookies();

      c.set("profil",JSON.stringify(user),{secure:false, sameSite:false,maxAge:3600})

      return NextResponse.json({connected:true,utilisateur:user,token:user.id}, { status: 201 });
      // return NextResponse.json({connected:true,"re":2}, { status: 201 });
    }else{
      return NextResponse.json({connected:false},{status:201})
    }
  } catch (error:any) {
    return NextResponse.json({error:error.toString()}, { status: 503 });
  }
}

export async function PUT(Request: NextRequest) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}

export async function DELETE(Request: NextRequest) {
  const {} = await Request.json();

  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}
