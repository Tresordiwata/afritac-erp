import { number } from "zod"
import { IFactureImport } from "./factureImport"
import { IRubriqueFacture } from "./rubriqueFacture"

export type IDetailFacture={
    id:string
    factureId : string
    facture? : IFactureImport
    rubriqueFactureId : string
    rubriqueFacture : IRubriqueFacture
    qte? : number
    prix? : number
}