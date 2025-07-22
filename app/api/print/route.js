// app/api/print/route.js
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../../../components/MyDocument';
import React from 'react';

export async function GET() {
  // ⚠️ Utilise React.createElement pour créer l’élément proprement
  const pdfBuffer = await pdf(React.createElement(MyDocument)).toBuffer();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="MonDocument.pdf"',
    },
  });
}
