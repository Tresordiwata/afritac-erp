// import React from 'react'
// import PageClient from './PageClient'

// const page = () => {
//   return (
//     <PageClient />
//   )
// }

// export default page

import React from "react";

import PageClient from "./PageClient";

import { prisma } from "@/lib/prisma";
import { IFactureImport } from "@/lib/types/factureImport";
import { IDetailFacture } from "@/lib/types/detailFacture";
const page = async ({
  searchParams,
}: {
  searchParams: { datafrom?: string };
}) => {
  const dataFrom = searchParams.datafrom;

  if (dataFrom) {
    const facture = await prisma.factureImport.findUnique({
    
      select: {
        id:true,
        dossier:true,
        dateFacture:true,
        journalTypeId:true,
        journalType: true,
        manifeste:true,
        marchandise:true,
        camionId:true,
        montant:true
      },
      where: {
        id: dataFrom,
      },
      
    });

    const detailFact=await prisma.detailFacture.findFirst({
      where:{
        factureId:facture?.id
      }
    })
    
   
    return (
      <div>
        {/* <div>{facture?.montant}</div> */}
        <PageClient montant={facture?.montant} client={facture?.journalTypeId} dossier={facture?.dossier} detail={detailFact?.contenu} />
      </div>
    );
  } else return <PageClient />;
  // return (
  //   // if(dataFrom){"Existe"}else"Inexistant"
  //   // []
  //   // <PageClient />
  // )
};

export default page;
