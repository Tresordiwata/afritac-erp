"use client";

import { Button } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Archive, Eye, Grip, Loader2, Printer, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Modal, Select, Spin, Tag } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

import { IInvoice } from "@/lib/types/invoice";
import { getClients, getPaiementNotArchived } from "@/services/getData";
import { generateInvoicePDF } from "@/lib/pdf";
import { useInvoiceStore } from "@/lib/store/invoice";
import { IClient } from "@/lib/types/client";
import { formatNombre } from "@/lib/utils";

let idSelected: any = null;

export default function InvoiceList() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalArchive, setShowModalArchive] = useState(false);
  const [value, setValue] = useState("");

  const clients = useQuery({ queryKey: ["clientsList"], queryFn: getClients })
    .data as IClient[];
  const {
    invoices,
    deleteInvoice,
    archiveInvoice,
    setSelectedInvoice,
    addInvoice,
  } = useInvoiceStore();
  let activeInvoices = useQuery({
    queryKey: ["p"],
    queryFn: getPaiementNotArchived,
    refetchInterval: 3000,
  }).data as IInvoice[];
  const setDelete = () => {
    setSpinning(true);
    fetch("/api/paiement", {
      method: "DELETE",
      body: JSON.stringify({ id: idSelected }),
    })
      .then((r) => {
        r.json();
        if (r.status == 201) {
          toast("Bien supprimé", { theme: "dark", type: "success" });
        } else {
          toast("Echec de suppression", { theme: "dark", type: "error" });
        }
      })
      .then((r) => {})
      .finally(() => {
        setSpinning(false);
        setShowModalDelete(false);
      });
  };
  const setArchiver = () => {
    setSpinning(true);
    fetch("/api/paiement", {
      method: "PUT",
      body: JSON.stringify({ action: "archive", id: idSelected }),
    })
      .then((r) => {
        r.json();
        if (r.status == 201) {
          toast("Facture archivée", { theme: "dark", type: "success" });
        } else {
          toast("Echec de suppression", { theme: "dark", type: "error" });
        }
      })
      .then((r) => {})
      .finally(() => {
        setSpinning(false);
        setShowModalArchive(false);
      });
  };
  let listeClient: { value: string; label: string }[] = [];

  clients?.map((cl) => {
    listeClient.push({ value: cl.id, label: cl.nom_client });
  });
  const displayListById = (id: any) => {};

  return (
    <Spin indicator={<Loader2 className="animate-spin" />} spinning={spinning}>
      <Card>
        <CardHeader className="border-b flex justify-between">
          <div className="flex gap-3 color-primary items-center">
            <Grip /> Liste des Factures
          </div>
          <>
            {/* <Select
              showSearch
              filterSort={(optionA, optionB) => {
                var _a, _b;

                return (
                  (_a =
                    optionA === null || optionA === void 0
                      ? void 0
                      : optionA.label) !== null && _a !== void 0
                    ? _a
                    : ""
                )
                  .toLowerCase()
                  .localeCompare(
                    ((_b =
                      optionB === null || optionB === void 0
                        ? void 0
                        : optionB.label) !== null && _b !== void 0
                      ? _b
                      : ""
                    ).toLowerCase(),
                  );
              }}
              optionFilterProp="label"
              options={listeClient}
              placeholder="Selection un client..."
              style={{ width: 200 }}
              onChange={(e) => {
                alert("kll");
                displayListById(e);
              }}
            /> */}
          </>
        </CardHeader>
        <CardBody>
            <Table>
          <TableHeader>
              
                <TableColumn>Date</TableColumn>
                <TableColumn>Client</TableColumn>
                <TableColumn className="text-center">Motif</TableColumn>
                <TableColumn className="text-right">Montant</TableColumn>
                <TableColumn className="text-right">Actions</TableColumn>
              
            </TableHeader> 
             <TableBody>
              {activeInvoices?.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    {moment(invoice.datePaiement).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="font-bold">
                    {invoice.client.nom_client}
                  </TableCell>
                  <TableCell className="text-center">{invoice.motif}</TableCell>
                  <TableCell className="text-right">
                    <Tag color="cyan">{formatNombre(invoice.montant)} $</Tag>
                  </TableCell>
                  <TableCell className="text-right gap-2 flex justify-center">
                    <Button
                      size={"md"}
                      variant="ghost"
                      isIconOnly={true}
                      onPress={() => {
                        console.log(invoice);

                        setSelectedInvoice(invoice);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size={"md"}
                      variant="ghost"
                      onPress={() => generateInvoicePDF(invoice)}
                       isIconOnly={true}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      size={"md"}
                      variant="ghost"
                      onPress={() => {
                        idSelected = invoice.id;
                        setShowModalArchive(true);
                      }}
                       isIconOnly={true}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button
                      size={"md"}
                      variant="ghost"
                      onPress={() => {
                        idSelected = invoice.id;
                        setShowModalDelete(true);
                        // deleteInvoice(invoice.id)
                      }}
                       isIconOnly={true}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> 
          </Table>
        </CardBody>
      </Card>
      <Modal
        cancelText="Annuler"
        okText="Supprimer"
        open={showModalDelete}
        title="Suppression facture"
        onCancel={() => setShowModalDelete(false)}
        onOk={() => setDelete()}
      >
        Voulez-vous vraiment supprimer ?
      </Modal>
      <Modal
        cancelText="Annuler"
        okText="Archiver"
        open={showModalArchive}
        title="Archiver facture"
        onCancel={() => setShowModalArchive(false)}
        onOk={() => setArchiver()}
      >
        Voulez-vous vraiment archiver cette facture ?
      </Modal>
    </Spin>
  );
}
