import { IMarchandise } from "@/lib/types/marchandise"

export const getMarchandises=async()=>{
    let response:IMarchandise[]=[]
    const requete=await fetch("api/marchandise")
    if(requete.status==201)
    {
        response=(await requete.json()) as IMarchandise[]
    }
    return await response
} 