"use client";
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
// import n2words from "n2words"

import { BACKEND_URL } from "@/lib/utils";
import { IFactureImport } from "@/lib/types/factureImport";
import { IInvoice } from "@/lib/types/invoice";
import { enLettresSansDevise } from "@/app/utils/fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #2563eb",
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 5,
  },
  companyInfo: {
    marginBottom: 30,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 5,
  },
  companyText: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#1e293b",
    textAlign: "right",
  },
  invoiceInfo: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "right",
  },
  table: {
    display: "flex",
    width: "100%",
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 32,
    fontSize: 9,
  },
  tableHeader: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
  },
  tableCell: {
    width: "25%",
    padding: 8,
    color: "#1e293b",
  },
  tableCellHeader: {
    width: "25%",
    padding: 8,
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 9,
    color: "#475569",
  },
  bold: {
    fontWeight: "bold",
    color: "#1e293b",
  },
  totals: {
    marginTop: 20,
    alignItems: "flex-end",
    borderTop: "2px solid #e2e8f0",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    width: 100,
    textAlign: "right",
    paddingRight: 10,
    fontSize: 10,
    color: "#64748b",
  },
  totalValue: {
    width: 100,
    textAlign: "right",
    fontSize: 10,
    color: "#1e293b",
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
  },
});
const colorBlue = "#072BAF";

const FacturationPaiement = ({ invoice }: { invoice?: IInvoice }) => {
  const entete = [styles.companyText, { fontSize: 8 }];
  return (
    <PDFViewer height={500} width={"100%"}>
      <Document title="facture">
        <Page size={"A5"} style={styles.page}>
          <View style={styles.header}>
            <View>
              <View style={styles.logoContainer}>
                <Image
                  src={`${BACKEND_URL}logo-afritac.png`}
                  style={styles.logo}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  alignContent: "flex-end",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  fontSize: 8,
                }}
              >
                <Text style={entete}>A1201438C RCCM / 14-B - 1671</Text>
                <Text style={entete}>ID. NAT. N° 05-H4501-N62554G</Text>
                <Text style={entete}>
                  {"903, Av. Du 30 juin, C/L'shi, LUBUMBASHI"}
                </Text>
              </View>

              <View style={[styles.companyInfo, { marginTop: 20 }]}>
                <Text
                  style={[
                    styles.companyText,
                    styles.bold,
                    { color: "#072BAF" },
                  ]}
                >
                  {invoice?.client.nom_client}
                </Text>
                <Text style={styles.companyText}>
                  {invoice?.client.num_nif} RCCM: {invoice?.client?.rccm}
                </Text>
                <Text style={styles.companyText}>{invoice?.client?.idNat}</Text>
                <Text style={styles.companyText}>
                  {invoice?.client?.adresse}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ color: "#072BAF", fontSize: 15, fontWeight: "bold" }}
            >
              Reçu N°:
              {invoice.numeroInvoice?.length === 5
                ? "00" + invoice.numeroInvoice
                : invoice.numeroInvoice?.length === 4
                  ? "000" + invoice.numeroInvoice
                  : invoice.numeroInvoice?.length === 6
                    ? "0" + invoice.numeroInvoice
                    : invoice?.numeroInvoice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              display: "flex",
              gap: 15,
              marginTop: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 7,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12 }}>La somme en lettre : </Text>
              <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                {enLettresSansDevise(Number(invoice?.montant))
                  .charAt(0)
                  .toUpperCase() +
                  enLettresSansDevise(Number(invoice?.montant)).slice(
                    1
                  )}{" "}
                dollars americains
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 12 }}>La somme en chiffre : </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                USD {invoice?.montant.toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.companyInfo,
                {
                  display: "flex",
                  marginTop: 15,
                  flexDirection: "column",
                  gap: 7,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ fontSize: 13, color: "#AFA316" }}>
                Motif du paiement :{" "}
              </Text>
              <Text style={{ fontSize: 13, fontStyle: "italic" }}>
                {invoice?.motif}
              </Text>
            </View>
          </View>

          <View
            style={[styles.totals, { gap: 20, marginTop: 20, paddingTop: 20 }]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}>
                Lubumbashi, le{" "}
                {moment(invoice?.datePaiement).format("DD/MM/YYYY")}{" "}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}>
                Signature du Caissier{" "}
              </Text>
              <Text style={{ fontSize: 12 }}>{""}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FacturationPaiement;
