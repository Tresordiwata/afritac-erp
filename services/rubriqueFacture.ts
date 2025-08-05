import { IRubriqueFacture } from "@/lib/types/rubriqueFacture"

export const getRubriqueFactures=async()=>{
    let response:IRubriqueFacture[]=[]
    const requete=await fetch("api/rubrique-facture")
    if(requete.status==201)
    {
        response=(await requete.json()) as IRubriqueFacture[]
    }
    return await response
} 