import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { IInvoice } from "./types/invoice";
import { numberToWords } from "./utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const LOGO_URL =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop";

export const generateInvoicePDF = async (
  invoice: IInvoice,
  save: boolean = true
) => {
  const doc:any = new jsPDF();

  // Configuration des couleurs et styles
  const primaryColor = "#2563eb";
  const secondaryColor = "#64748b";

  // En-tête avec logo
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F");

  // Ajout du logo (simulé avec un cercle bleu pour l'instant)
  doc.setFillColor("#ffffff");
  doc.circle(30, 20, 10, "F");

  // Titre de la facture
  doc.setTextColor("#ffffff");
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURE", 60, 25);

  // Informations de la facture
  doc.setTextColor("#000000");
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Numéro et date de facture
  doc.text(`Facture N°: ${invoice.id}`, 20, 60);
  doc.text(
    `Date: ${format(invoice.datePaiement, "d MMMM yyyy", { locale: fr })}`,
    20,
    70
  );

  // Informations du client
  doc.setFillColor("#f8fafc");
  doc.rect(20, 80, 170, 40, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT", 25, 90);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.client.nom_client, 25, 100);

  // Détails de la facture
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("DÉTAILS", 20, 140);

  // Tableau des détails
  doc?.autoTable({
    startY: 150,
    head: [["Description", "Montant"]],
    body: [[invoice.motif, `${invoice.montant.toFixed(2)} €`]],
    styles: {
      fontSize: 12,
      cellPadding: 8,
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: "#ffffff",
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: "#f8fafc",
    },
  });

  // Total
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 140, finalY + 20);
  doc.text(`${invoice.montant.toFixed(2)} €`, 170, finalY + 20);

  // Montant en lettres
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Arrêtée la présente facture à la somme de :", 20, finalY + 40);
  doc.setFont("helvetica", "bold");
  doc.text(numberToWords(invoice.montant), 20, finalY + 50);

  // Pied de page
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  doc.setFont("helvetica", "normal");
  doc.text("Merci de votre confiance", 20, 280);

  // Sauvegarde du PDF uniquement si demandé
  if (save) {
    doc.save(`facture-${invoice.id}.pdf`);
  }

  return doc;
};
