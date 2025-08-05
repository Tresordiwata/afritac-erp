"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { FilePlus2, Loader2, PrinterCheck, PrinterCheckIcon } from "lucide-react";
import { toast } from "react-toastify";
import moment from "moment";
import Link from "next/link";

import { getJournalTypes } from "@/services/journal";
import { IJournalType } from "@/lib/types/journalType";
import LayoutSecond from "@/layouts/LayoutSecond";
import { IFactureImport } from "@/lib/types/factureImport";
import { formatNombre } from "@/lib/utils";

const PageClient = () => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState({
    client: "",
    dateFrom: "",
    dateEnd: "",
  });
  const [allFactures, setAllFactures] = useState<IFactureImport[]>([]);
  const _clients:IJournalType[] | any[] | undefined | any = useQuery({ queryKey: ["client"], queryFn: getJournalTypes })
    ?.data as IJournalType[];

  const handleSubmit = () => {
    setSpinning(true);
    fetch("api/reporting/factureImport", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r) => {
        setAllFactures(r);
      })
      .catch((r) => {
        toast("Une erreur s'ets produite", { theme: "dark", type: "error" });
      })
      .finally(() => {
        setSpinning(false);
      });
  };
  const getListeDefault=()=>{
    fetch("api/reporting/factureImport").then(r=>r.json())
    .then((r)=>{
      setAllFactures(r)
    })
  }
  useEffect(()=>{
    getListeDefault()
  },[])

  return (
    <LayoutSecond backable={true} titre={"Liste factures"}>
      <div className="flex flex-col">
        <div className="flex gap-4 items-center justify-center px-3">
          <Select
            label="Client"
            labelPlacement="outside"
            onChange={(e) => {
              setData({ ...data, client: e.target.value });
            }}
          >
            <SelectItem key={"*"}>Tout</SelectItem>
            {_clients
              ?.sort((a:any, b:any) => a?.libelle.localeCompare(b?.libelle, "fr"))
              ?.map((client:any, i:any) => (
                <SelectItem key={client?.id}>{client?.libelle}</SelectItem>
              ))}
          </Select>
          <Input
            label="Du"
            labelPlacement="outside"
            name="dtFrom"
            type="date"
            onChange={(e) => {
              setData({ ...data, dateFrom: e.target.value });
            }}
          />
          <Input
            label="Au"
            labelPlacement="outside"
            name="dtEnd"
            type="date"
            onChange={(e) => {
              setData({ ...data, dateEnd: e.target.value });
            }}
          />
          <Button
            className="mt-5"
            color="primary"
            onPress={() => handleSubmit()}
          >
            Visualiser
          </Button>
        </div>
        <div className="flex flex-row gap-3 mt-8">
          <Card className="w-full">
            <CardHeader className="border-b border-gray-700">
              Liste : {allFactures?.length}
            </CardHeader>
            <CardBody>
              <Spin
                indicator={<Loader2 className="animate-spin" />}
                spinning={spinning}
              >
                <Tabs title="Tres">
                  <Tab key="1" title="Liste">
                    {allFactures?.length > 0 && (
                      <div className="my-3 text-center">
                        <Link
                          href={`/print/facture-import-more?params=${JSON.stringify(data)}`}
                          target="_blank"
                        >
                          <Button
                            color="primary"
                            startContent={<PrinterCheckIcon />}
                          >
                            {" "}
                            Imprimer dans un fichier
                          </Button>
                        </Link>
                      </div>
                    )}
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-500">
                          <th className="py-2">Date</th>
                          <th className="">Camion</th>
                          <th>Facture</th>
                          <th>Déclaration</th>
                          <th>Liquidation</th>
                          <th>Montant</th>
                          <th>Opt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFactures?.map((facture, i) => (
                          <tr key={i} className="border-b border-gray-700 hover:bg-secondary-400">
                            <td className="py-3">
                              {moment(facture?.dateFacture).format(
                                "DD/MM/YYYY",
                              )}
                            </td>
                            <td>{facture.camion?.libelle}</td>
                            <td>{facture.numeroFacture}</td>
                            <td>{facture.declarationId}</td>
                            <td>{facture.liquidationId}</td>
                            <td>{formatNombre(facture.montant)} USD</td>
                            <td className="flex gap-3 items-center justify-center pt-2">
                              <Link href={`saisie-rapide/?datafrom=${facture.id}`}>
                                <Button variant="flat" color="primary" isIconOnly={true} startContent={<FilePlus2 size={"14"} />} size="sm" />
                              </Link>
                              <Link
                                href={"/print/facturationimport/" + facture?.id}
                                target="_blank"
                              >
                                <Button isIconOnly={true} size="sm">
                                  <PrinterCheck size={14} />
                                </Button>
                              </Link>
                              {/* <div>
                            <Button
                            onPress={()=>{
                              pdf(<Facturationimport facture={facture} />).toBuffer()
                            }}
                            ><PrinterCheck /></Button>
                          </div> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tab>
                  <Tab key="2" title="Imprimable">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-500">
                          <th>Numéro</th>
                          <th className="">Date</th>
                          <th>Camion</th>
                          <th>Marchandise</th>
                          <th>N° T-1</th>
                          <th>N° Déclaration</th>
                          <th>Nbre Colis</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFactures?.map((facture, i) => (
                          <tr key={i} className="border-b border-gray-700">
                            <td>{facture.numeroFacture}</td>
                            <td>
                              {moment(facture?.dateFacture).format(
                                "YYYY-MM-DD",
                              )}
                            </td>
                            <td>{facture.camion?.libelle}</td>
                            <td>{facture.marchandise?.libelle}</td>
                            <td>{facture.t1}</td>
                            <td>
                              {facture.declarationId} DU{" "}
                              {moment(facture?.declarationDate).format(
                                "DD/MM/YYYY",
                              )}
                            </td>
                            <td>{facture.colis}</td>
                            <td>{facture.montant}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tab>
                </Tabs>
              </Spin>
            </CardBody>
          </Card>
          {/* <Card className="w-1/3">
            <CardHeader className="border-b border-gray-700">
              Resultat
            </CardHeader>
            <CardBody>Rien</CardBody>
          </Card> */}
        </div>
      </div>
    </LayoutSecond>
  );
};

export default PageClient;
