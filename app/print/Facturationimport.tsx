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
import { formatNombre } from "@/lib/utils";

// import n2words from "n2words"
import { useQuery } from "@tanstack/react-query";

import { enLettresSansDevise } from "@/app/utils/fns";
import { BACKEND_URL } from "@/lib/utils";
import { IFactureImport } from "@/lib/types/factureImport";
import { IDetailFactureContenu } from "@/lib/types/detailFactureContenu";
import { getRubriqueFactures } from "@/services/rubriqueFacture";
import { IRubriqueFacture } from "@/lib/types/rubriqueFacture";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "0px solid #2563eb",
    paddingBottom: 0,
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
    backgroundColor: "",
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
const rubriques = [
  {
    client: "SOMIKA SAS",
    typeFacture: "C",
    rubriques: [
      {
        description: "SEGUCE",
        qt: "1,00",
        pu: "125,00",
        taxe: "Exoneré de TVA",
        mt: "$ 125,00",
      },
      {
        description: "SCELLE ELECTRONIQUE",
        qt: "1,00",
        pu: "40,00",
        taxe: "Exoneré de TVA",
        mt: "$ 40,00",
      },
      {
        description: "KANYAKA",
        qt: "1,00",
        pu: "30,00",
        taxe: "Exoneré de TVA",
        mt: "$ 30,00",
      },
      {
        description: "FRAIS CONNEXES",
        qt: "1,00",
        pu: "347,00",
        taxe: "Exoneré de TVA",
        mt: "$ 347,00",
      },
      {
        description: "LIQUIDATION",
        qt: "1,00",
        pu: "0,00",
        taxe: "16%",
        mt: "$ 0,00",
      },
      {
        description: "HONORAIRES",
        qt: "1,00",
        pu: "50,00",
        taxe: "16%",
        mt: "$ 50,00",
      },
    ],
    sousTotal: "$ 592,00",
    sousTotal1: "$ 0,00",
    sousTotal2: "$ 8,00",
    total: "$ 600.00",
    totalNumber: 600,
  },
];
const Facturationimport = ({ facture,rubriquesFact }: { facture?: IFactureImport | any, rubriquesFact?:IRubriqueFacture | any }) => {
  const clientRubrique = rubriques.find(
    (cl) => cl.client == facture?.journalType?.Client?.nom_client,
  );
  const rubriquesFromBdd = rubriquesFact

  if (
    new Date(moment(facture?.dateFacture).format("YYYY-MM-DD")) >
    new Date(moment("2025-08-02").format("YYYY-MM-DD"))
  ) {
    // Avec detail dynamique
    const details: IDetailFactureContenu[] = facture?.detailFacture[0].contenu;

    return (
      <div>
        {/* <div>{?.detailFacture[0]?.toString}</div> */}
        <PDFViewer height={500} width={1200}>
          <Document title="facture">
            <Page size={"A4"} style={styles.page}>
              <View style={styles.header}>
                <View>
                  <View style={styles.logoContainer}>
                    <Image
                      src={`${BACKEND_URL}logo-afritac.png`}
                      style={styles.logo}
                    />
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{ alignContent: "flex-end", alignItems: "flex-end" }}
                  >
                    <Text style={styles.companyText}>AFRITAC AGENCY SARL</Text>
                    <Text style={styles.companyText}>
                      A1201438C RCCM / 14-B - 1671
                    </Text>
                    <Text style={styles.companyText}>
                      ID. NAT. N° 05-H4501-N62554G
                    </Text>
                    <Text style={styles.companyText}>
                      {"903, Av. Du 30 juin, C/L'shi, LUBUMBASHI"}
                    </Text>
                    <Text style={styles.companyText}>
                      République démocratique du Congo
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.companyInfo,
                      { marginTop: 3, marginLeft: -70 },
                    ]}
                  >
                    <Text style={[styles.companyText, styles.bold]}>
                      {facture?.journalType?.Client?.nom_client}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.num_nif} RCCM. N°{" "}
                      {facture?.journalType?.Client?.rccm}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.idNat}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.adresse}
                    </Text>
                    <Text style={styles.companyText}>LUBUMBASHI</Text>
                    <Text style={styles.companyText}>
                      République démocratique du Congo
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    color: "#072BAF",
                    fontSize: 18,
                    marginTop: -30,
                    fontWeight: "",
                  }}
                >
                  Facture {facture?.numeroFacture}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={[
                    styles.companyText,
                    { color: "#AFA316", width: "50%" },
                  ]}
                >
                  Date de la facture
                </Text>
                <Text
                  style={[
                    styles.companyText,
                    { color: "#AFA316", width: "50%" },
                  ]}
                >
                  {"Date d'echange"}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.companyText, { width: "50%" }]}>
                  {moment(facture?.dateFacture).format("YYYY-MM-DD")}
                </Text>
                <Text style={[styles.companyText, { width: "50%" }]}>
                  {moment(facture?.dateFacture).format("YYYY-MM-DD")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  display: "flex",
                  gap: 4,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Camion :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° T-1 :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Déclaration :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Liquidation :{" "}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                      paddingRight: 8,
                    }}
                  >
                    {facture?.camion?.libelle}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.t1}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.declarationId} DU{" "}
                    {moment(facture?.declarationDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.liquidationId} DU{" "}
                    {moment(facture?.liquidationDate).format("DD/MM/YYYY")}
                  </Text>
                  {/* <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                {n2words(1000, { lang: "fr" })
                  .charAt(0)
                  .toUpperCase() +
                  n2words(1450, { lang: "fr" }).slice(
                    1
                  )}{" "}
                dollars americains
              </Text> */}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N°Quittance :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    AV :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Licence :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Manifeste :{" "}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {facture?.quittanceId}{" "}
                    {moment(facture?.quittanceDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.manifeste}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Marchandise :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Nombre de colis
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    {"Poids [kg]"}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Dossier :{" "}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {facture?.marchandise?.libelle}{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.colis}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.poids}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.dossier}
                  </Text>
                </View>
                <View
                  style={{
                    border: "1px solid #000",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: -1,
                      fontSize: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 0 3 3",
                        width: "25%",
                      }}
                    >
                      DESCRIPTION
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "15%",
                        textAlign: "right",
                      }}
                    >
                      QUANTITE
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      PRIX UNITAIRE
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "20%",
                      }}
                    >
                      TAXES
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        fontWeight: "bold",
                        borderBottom: "1px solid #000",
                        padding: "3 2 3 3",
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      MONTANT
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 8,
                    }}
                  >
                    {details?.map((detail, i2) => (
                      <View
                        key={i2}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Text
                          style={{
                            padding: "4 0 4 4",
                            borderRight: "1px solid #000",
                            width: "25%",
                          }}
                        >
                          {
                            rubriquesFromBdd.find(
                              (rfb:IRubriqueFacture) => rfb.id == detail?.rubrique,
                            )?.libelle?.toUpperCase()
                          }
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "15%",
                            textAlign: "right",
                          }}
                        >
                          {formatNombre(detail?.qt)}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "20%",
                            textAlign: "right",
                          }}
                        >
                          {formatNombre(detail?.prix)}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "20%",
                            textAlign: "left",
                          }}
                        >
                          {detail?.exonereTva=="Y"?"Exoneré de TVA":"16%"}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "0px solid #000",
                            width: "20%",
                            textAlign: "right",
                            backgroundColor: "#CCC",
                          }}
                        >
                          $ {formatNombre(parseFloat(detail?.prix) * parseFloat(detail.qt))}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>{}</View>
                  <View style={{ width: "50%", fontSize: 8 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #000",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottom: "1px solid #000",
                          padding: "4 3 4 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "50%",
                            fontWeight: "bold",
                            color: colorBlue,
                          }}
                        >
                          Sous-total
                        </Text>
                        <Text style={{ textAlign: "right", width: "50%" }}>
                          $ {formatNombre(details?.reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #000",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "1px solid #000",
                            paddingVertical: 5,
                          }}
                        >
                          TVA 0% de $ {formatNombre(details?.reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))}
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: "#CCC",
                            paddingRight: 4,
                          }}
                        >
                          $ {formatNombre(((details?.reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))*0)/100)}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #000",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "1px solid #000",
                            paddingVertical: 5,
                          }}
                        >
                          TVA 16% de $ {
                            formatNombre(details?.
                              filter(d=>{return d.exonereTva=="N"})?.
                              reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0)
                            )
                          }
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: "#CCC",
                            paddingRight: 4,
                          }}
                        >
                          $ {
                            formatNombre((((details?.
                            filter(d=>{return d.exonereTva=="N"})?.
                            reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))*16)/100
                            ))
                          }
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #CCC",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          backgroundColor: colorBlue,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "0px solid #CCC",
                            paddingVertical: 5,
                          }}
                        >
                          Total
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: colorBlue,
                            paddingRight: 4,
                          }}
                        >
                          $ 
                          {" "+
                            formatNombre(details?.reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0)
                            +
                            (((details?.
                            filter(d=>{return d.exonereTva=="N"})?.
                            reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))*16)/100
                            ))
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    fontSize: 8,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  <Text>Sauf erreur de notre part, nous disons: </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {
                    enLettresSansDevise(
                      details?.reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0)
                            +
                            (((details?.
                            filter(d=>{return d.exonereTva=="N"})?.
                            reduce((init:any,acc:any)=>{return init+((parseFloat(acc?.qt))*(parseFloat(acc?.prix)))},0))*16)/100
                            )
                    )
                    } Dollars
                  </Text>
                </View>
                <View
                  style={{ fontSize: 8, display: "flex", flexDirection: "row" }}
                >
                  <Text>
                    {
                      "Merci d'utiliser la communication suivante pour votre paiement: "
                    }
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {facture?.numeroFacture}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 170,
                    fontSize: 6,
                    borderTop: "2px solid #000",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    info@afritac.com http://www.afritac.com Tax ID: 1882/2013
                  </Text>
                  <Text style={{ textAlign: "center", marginTop: 4 }}>
                    EQUITY:00018-00016-01217961200-89 USD (SWIFT:BCDCCDKIXXX) |
                    RAWBANK:05100-05100-05130-01010892901-41 USD
                    (SWIFT:RAWBCDKI)
                  </Text>
                  <Text style={{ textAlign: "center", marginTop: 4 }}>
                    FBN:00014-25000-20300063213-57 USD(SWIFT:BICDCDKI) |
                    TMB:00017-25000-00257700100-23 USD(SWIFT:TRMSCD3L) |
                    ECOBANK:00026000043520002702683 USD(SWIFT:ECOCCDKI)
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    );
  } else {
    return (
      <div>
        <PDFViewer height={500} width={1200}>
          <Document title="facture">
            <Page size={"A4"} style={styles.page}>
              <View style={styles.header}>
                <View>
                  <View style={styles.logoContainer}>
                    <Image
                      src={`${BACKEND_URL}logo-afritac.png`}
                      style={styles.logo}
                    />
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{ alignContent: "flex-end", alignItems: "flex-end" }}
                  >
                    <Text style={styles.companyText}>AFRITAC AGENCY SARL</Text>
                    <Text style={styles.companyText}>
                      A1201438C RCCM / 14-B - 1671
                    </Text>
                    <Text style={styles.companyText}>
                      ID. NAT. N° 05-H4501-N62554G
                    </Text>
                    <Text style={styles.companyText}>
                      {"903, Av. Du 30 juin, C/L'shi, LUBUMBASHI"}
                    </Text>
                    <Text style={styles.companyText}>
                      République démocratique du Congo
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.companyInfo,
                      { marginTop: 3, marginLeft: -70 },
                    ]}
                  >
                    <Text style={[styles.companyText, styles.bold]}>
                      {facture?.journalType?.Client?.nom_client}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.num_nif} RCCM. N°{" "}
                      {facture?.journalType?.Client?.rccm}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.idNat}
                    </Text>
                    <Text style={styles.companyText}>
                      {facture?.journalType?.Client?.adresse}
                    </Text>
                    <Text style={styles.companyText}>LUBUMBASHI</Text>
                    <Text style={styles.companyText}>
                      République démocratique du Congo
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    color: "#072BAF",
                    fontSize: 18,
                    marginTop: -30,
                    fontWeight: "",
                  }}
                >
                  Facture {facture?.numeroFacture}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={[
                    styles.companyText,
                    { color: "#AFA316", width: "50%" },
                  ]}
                >
                  Date de la facture
                </Text>
                <Text
                  style={[
                    styles.companyText,
                    { color: "#AFA316", width: "50%" },
                  ]}
                >
                  {"Date d'echange"}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[styles.companyText, { width: "50%" }]}>
                  {moment(facture?.dateFacture).format("YYYY-MM-DD")}
                </Text>
                <Text style={[styles.companyText, { width: "50%" }]}>
                  {moment(facture?.dateFacture).format("YYYY-MM-DD")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  display: "flex",
                  gap: 4,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Camion :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° T-1 :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Déclaration :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Liquidation :{" "}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                      paddingRight: 8,
                    }}
                  >
                    {facture?.camion?.libelle}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.t1}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.declarationId} DU{" "}
                    {moment(facture?.declarationDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.liquidationId} DU{" "}
                    {moment(facture?.liquidationDate).format("DD/MM/YYYY")}
                  </Text>
                  {/* <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                {n2words(1000, { lang: "fr" })
                  .charAt(0)
                  .toUpperCase() +
                  n2words(1450, { lang: "fr" }).slice(
                    1
                  )}{" "}
                dollars americains
              </Text> */}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N°Quittance :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    AV :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Licence :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Manifeste :{" "}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {facture?.quittanceId}{" "}
                    {moment(facture?.quittanceDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.manifeste}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Marchandise :{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    Nombre de colis
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    {"Poids [kg]"}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "bold", width: "25%" }}
                  >
                    N° Dossier :{" "}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: "normal",
                      width: "25%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {facture?.marchandise?.libelle}{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.colis}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.poids}
                  </Text>
                  <Text
                    style={{ fontSize: 8, fontWeight: "normal", width: "25%" }}
                  >
                    {facture?.dossier}
                  </Text>
                </View>
                <View
                  style={{
                    border: "1px solid #000",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: -1,
                      fontSize: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 0 3 3",
                        width: "25%",
                      }}
                    >
                      DESCRIPTION
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "15%",
                        textAlign: "right",
                      }}
                    >
                      QUANTITE
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      PRIX UNITAIRE
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        borderRight: "1px solid #000",
                        borderBottom: "1px solid #000",
                        fontWeight: "bold",
                        padding: "3 2 3 3",
                        width: "20%",
                      }}
                    >
                      TAXES
                    </Text>
                    <Text
                      style={{
                        color: "#AFA316",
                        fontWeight: "bold",
                        borderBottom: "1px solid #000",
                        padding: "3 2 3 3",
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      MONTANT
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 8,
                    }}
                  >
                    {clientRubrique?.rubriques.map((rubrique, i2) => (
                      <View
                        key={i2}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Text
                          style={{
                            padding: "4 0 4 4",
                            borderRight: "1px solid #000",
                            width: "25%",
                          }}
                        >
                          {rubrique?.description}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "15%",
                            textAlign: "right",
                          }}
                        >
                          {rubrique?.qt}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "20%",
                            textAlign: "right",
                          }}
                        >
                          {rubrique?.pu}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "1px solid #000",
                            width: "20%",
                            textAlign: "left",
                          }}
                        >
                          {rubrique?.taxe}
                        </Text>
                        <Text
                          style={{
                            padding: "4 3 4 4",
                            borderRight: "0px solid #000",
                            width: "20%",
                            textAlign: "right",
                            backgroundColor: "#CCC",
                          }}
                        >
                          {rubrique?.mt}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>{}</View>
                  <View style={{ width: "50%", fontSize: 8 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #000",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottom: "1px solid #000",
                          padding: "4 3 4 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "50%",
                            fontWeight: "bold",
                            color: colorBlue,
                          }}
                        >
                          Sous-total
                        </Text>
                        <Text style={{ textAlign: "right", width: "50%" }}>
                          {clientRubrique?.sousTotal}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #000",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "1px solid #000",
                            paddingVertical: 5,
                          }}
                        >
                          TVA 0% de $ 542,00
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: "#CCC",
                            paddingRight: 4,
                          }}
                        >
                          {clientRubrique?.sousTotal1}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #000",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          marginTop: 0,
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "1px solid #000",
                            paddingVertical: 5,
                          }}
                        >
                          TVA 16% de $ 50,00
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: "#CCC",
                            paddingRight: 4,
                          }}
                        >
                          {clientRubrique?.sousTotal2}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          border: "0px solid #CCC",
                          borderBottom: 0,
                          padding: "0 0 0 3",
                          backgroundColor: colorBlue,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <Text
                          style={{
                            width: "60%",
                            borderRight: "0px solid #CCC",
                            paddingVertical: 5,
                          }}
                        >
                          Total
                        </Text>
                        <Text
                          style={{
                            width: "40%",
                            paddingVertical: 5,
                            textAlign: "right",
                            backgroundColor: colorBlue,
                            paddingRight: 4,
                          }}
                        >
                          {clientRubrique?.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    fontSize: 8,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  <Text>Sauf erreur de notre part, nous disons: </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {enLettresSansDevise(clientRubrique?.totalNumber)} Dollars
                  </Text>
                </View>
                <View
                  style={{ fontSize: 8, display: "flex", flexDirection: "row" }}
                >
                  <Text>
                    {
                      "Merci d'utiliser la communication suivante pour votre paiement: "
                    }
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {facture?.numeroFacture}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 170,
                    fontSize: 6,
                    borderTop: "2px solid #000",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    info@afritac.com http://www.afritac.com Tax ID: 1882/2013
                  </Text>
                  <Text style={{ textAlign: "center", marginTop: 4 }}>
                    EQUITY:00018-00016-01217961200-89 USD (SWIFT:BCDCCDKIXXX) |
                    RAWBANK:05100-05100-05130-01010892901-41 USD
                    (SWIFT:RAWBCDKI)
                  </Text>
                  <Text style={{ textAlign: "center", marginTop: 4 }}>
                    FBN:00014-25000-20300063213-57 USD(SWIFT:BICDCDKI) |
                    TMB:00017-25000-00257700100-23 USD(SWIFT:TRMSCD3L) |
                    ECOBANK:00026000043520002702683 USD(SWIFT:ECOCCDKI)
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    );
  }
};

export default Facturationimport;
