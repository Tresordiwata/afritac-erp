import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(Request) {
  try {
    const users=await prisma.utilisateur.findMany({
        select:{
            id:true,
            email:true,
            name:true,
            role:true,
            status:true
        }, where:{
            NOT:{
                status:'D'
            }
        }
    })
    return NextResponse.json(users, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function POST(Request) {
  try {
    const { nom, login, role, pwd } = await Request.json();
    const newUser=await prisma.utilisateur.create({
        data:{
            email:login,
            role:role,
            name:nom,
            password:pwd,
            status:'A'
        }
    })
    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function PUT(Request) {
  const { nom,login,role,pwd } = await Request.json();

  try {
    const newUser=await prisma.utilisateur.create({
        data:{
            email:login,
            role:role,
            name:nom,
            password:pwd,
            status:'A'
        }
    })
    return NextResponse.json({ data:newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 501 });
  }
}

export async function DELETE(Request) {
  const {id} = await Request.json();

  try {
    const user=await prisma.utilisateur.update({
        data:{
            status:"D"
        }, where:{
            id:id
        }
    })
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 501 });
  }
}
