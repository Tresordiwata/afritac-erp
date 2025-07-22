import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(Request) {
  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request) {
    const {oldPwd,newPwd,newPwd2} = await Request.json();
    const c=await cookies();
    const profil=c.get("profil").value
  try {
    const idUser=JSON.parse(profil).id
    const user=await prisma.utilisateur.findUnique({
        where:{
            id:Number(idUser)
        }
    })
    if(user.password!==oldPwd){
        return NextResponse.json({error:"L'actuel mot de passe saisi est incorrect"},{status:401})
    }else{
        const newU=await prisma.utilisateur.update({
            data:{
                password:newPwd
            },
            where:{
                id:Number(idUser)
            }
        })
        return NextResponse.json(newU, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({error:error.toString()}, { status: 501 });
  }
}

export async function PUT(Request) {
 

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
