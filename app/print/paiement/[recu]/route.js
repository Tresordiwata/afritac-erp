import {renderToStream} from "@react-pdf/renderer"
import { NextResponse } from "next/server"
import MyDocument from "./MyDocument"

import { Params } from "next/dist/server/request/params";
import { useInvoiceStore } from "@/lib/store/invoice";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";




export async function GET(req,res)
{
  const c=await cookies()
  const url=await res.params;
  const invoice=await prisma.paiement
  .findFirst({
    where:{
      id:Number(url.recu)
    },include:{client:true}
  })
const userProfil=c.get("profil")?.value;
  
  const stream=await renderToStream(
  <MyDocument 
      invoice={invoice} 
      user ={userProfil} 
  />)
  res.setHeader("Content-Type",'application/pdf')
  // res.setHeader("Content-Security-Policy",'frame-ancestors *')
  // res.setHeader("Access-Control-Allow-Origin",'*')
  return new NextResponse(stream,{
    headers:{
      "content-type": "application/pdf",
     
    }
  })
}