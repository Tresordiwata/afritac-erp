import { Client } from "./client"
export type IPaiement={
    id?:number,
    datePaiement:Date, 
    motif? : string,
    montant : number,
    client : Client
  
}