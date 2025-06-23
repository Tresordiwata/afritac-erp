import { ICamion } from "@/lib/types/camion"

export const getCamions=async()=>{
    let response:ICamion[]=[]
    const requete=await fetch("api/camion")
    if(requete.status==201)
    {
        response=(await requete.json()) as ICamion[]
    }
    return await response
} 