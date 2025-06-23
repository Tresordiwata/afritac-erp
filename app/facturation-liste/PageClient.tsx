"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Loader2, PrinterCheck } from "lucide-react";
import { toast } from "react-toastify";

import { getJournalTypes } from "@/services/journal";
import { IJournalType } from "@/lib/types/journalType";
import LayoutSecond from "@/layouts/LayoutSecond";
import { IFactureImport } from "@/lib/types/factureImport";
import moment from "moment";

const PageClient = () => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState({
    client: "",
    dateFrom: "",
    dateEnd: "",
  });
  const [allFactures, setAllFactures] = useState<IFactureImport[]>([]);
  const clients = useQuery({ queryKey: ["client"], queryFn: getJournalTypes })
    .data as IJournalType[];

  const handleSubmit = () => {
    setSpinning(true);
    fetch("api/reporting/factureImport", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r) => {
        setAllFactures(r)
      })
      .catch((r) => {
        toast("Une erreur s'ets produite", { theme: "dark", type: "error" });
      })
      .finally(() => {
        setSpinning(false);
      });
  };

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
            {clients
              ?.sort((a, b) => a.libelle.localeCompare(b.libelle, "fr"))
              ?.map((client, i) => (
                <SelectItem key={client.id}>{client.libelle}</SelectItem>
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
          <Card className="w-2/3">
            <CardHeader className="border-b border-gray-700">Liste</CardHeader>
            <CardBody>
              <Spin
                indicator={<Loader2 className="animate-spin" />}
                spinning={spinning}
              >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-500">
                            <th className="py-2">Date</th>
                            <th>Facture</th>
                            <th>Déclaration</th>
                            <th>Liquidation</th>
                            <th>Opt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFactures?.map((facture,i)=>(
                        <tr key={i} className="border-b border-gray-700">
                            <td className="py-3">{moment(facture?.dateFacture).format("DD/MM/YYYY")}</td>
                            <td>{facture.numeroFacture}</td>
                            <td>{facture.declarationId}</td>
                            <td>{facture.liquidationId}</td>
                            <td>
                                <Button isIconOnly={true} size="sm">
                                    <PrinterCheck size={14} />
                                </Button>
                            </td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </Spin>
            </CardBody>
          </Card>
          <Card className="w-1/3">
            <CardHeader className="border-b border-gray-700">
              Resultat
            </CardHeader>
            <CardBody>Rien</CardBody>
          </Card>
        </div>
      </div>
    </LayoutSecond>
  );
};

export default PageClient;
