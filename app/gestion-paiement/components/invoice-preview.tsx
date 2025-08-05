// "use client";

// import { useEffect, useState } from "react";
// import { useInvoiceStore } from "@/lib/store";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { generateInvoicePDF } from "@/lib/pdf";
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// // Configuration de worker pour react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// export function InvoicePreview() {
//   const selectedInvoice = useInvoiceStore((state) => state.selectedInvoice);
//   const [pdfData, setPdfData] = useState<string | null>(null);

//   useEffect(() => {
//     if (selectedInvoice) {
//       const generatePreview = async () => {
//         const doc = await generateInvoicePDF(selectedInvoice, false);
//         const pdfDataUrl = doc.output('dataurlstring');
//         setPdfData(pdfDataUrl);
//       };
//       generatePreview();
//     } else {
//       setPdfData(null);
//     }
//   }, [selectedInvoice]);

//   if (!selectedInvoice || !pdfData) {
//     return (
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle>Aperçu de la facture</CardTitle>
//         </CardHeader>
//         <CardContent className="flex items-center justify-center h-[600px] text-muted-foreground">
//           Sélectionnez ou créez une facture pour voir l'aperçu
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle>Aperçu de la facture</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[800px] overflow-auto">
//         <Document
//           file={pdfData}
//           loading={
//             <div className="flex items-center justify-center h-full">
//               Chargement du PDF...
//             </div>
//           }
//         >
//           <Page
//             pageNumber={1}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//             width={550}
//           />
//         </Document>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useInvoiceStore } from "@/lib/store/invoice";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Grip } from "lucide-react";
import { BACKEND_URL } from "@/lib/utils";
import FacturationPaiement from "@/app/print/paiement_updated/FacturationPaiement";

export function InvoicePreview() {
  
  const selectedInvoice = useInvoiceStore((state) => state.selectedInvoice);

  if (selectedInvoice) {
    return (
      <Card className="min-h-[300px]"> 
        <CardHeader className="border-b border-gray-700">
          <div className="text-lg flex gap-2 items-center color-primary"><Grip size={18} /> Aperçu de la facture</div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
          {/* <iframe sandbox="allow-scripts" src={`${BACKEND_URL}print/paiement/${selectedInvoice.id}`} style={{height:"100%", width:"100%"}} /> */}
        <FacturationPaiement invoice={selectedInvoice} />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-700">
        <div>Aperçu de la facture</div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="bg-primary h-20 rounded-lg flex items-center px-6">
          <h2 className="text-2xl font-bold text-white">FACTURE</h2>
        </div>
        
        <div className="space-y-2">
          <p>Facture N°: {selectedInvoice?.id}</p>
          <p>
            {/* Date: {selectedInvoice.createdAt.toLocaleDateString('fr-FR')} */}

          </p>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-bold mb-2">CLIENT</h3>
          <p>{selectedInvoice?.client?.nom_client}</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">DÉTAILS</h3>
          <div className=" rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-t">{selectedInvoice?.motif}</td>
                  <td className="p-2 border-t text-right">{selectedInvoice?.montant.toFixed(2)} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}