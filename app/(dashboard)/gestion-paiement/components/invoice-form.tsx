"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@heroui/button";

import { Input } from "@heroui/input";

import { useInvoiceStore } from "@/lib/store/invoice";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Grip,
  Loader2,
  SaveIcon,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { cn } from "@/lib/utils2";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/getData";
import { IClient } from "@/lib/types/client";
import { Modal, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { IPaiement } from "@/lib/types/paiement";
import { IInvoice } from "@/lib/types/invoice";
import { Select, SelectItem } from "@heroui/react";
import { AddNoteIcon } from "@/styles/icones";

let formvalues = {};
export function InvoiceForm() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [value, setValue] = useState("");
  const [showModalAddFacture, setShowModalAddFacture] = useState(false);
  const {
    invoices,
    deleteInvoice,
    archiveInvoice,
    setSelectedInvoice,
    addInvoice,
  } = useInvoiceStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModalAddFacture(true);
    // addInvoice({
    //   client: values.client,
    //   montant: values.montant,
    //   motif: values.motif,
    //   date: values.date,
    // });
    // form.reset();
  };

  const addFacture = () => {
    fetch("/api/paiement", { method: "POST", body: JSON.stringify(formvalues) })
      .then((r) => {
        if (r.status == 201) {
          toast("Bien enregistré", {
            theme: "dark",
            type: "success",
            autoClose: 1500,
          });
          r?.json().then((r2) => {
            let facture = r2 as IPaiement;
            let inv = r2 as IInvoice;
            setSelectedInvoice(inv);
            // addInvoice({
            //   client: facture.client.nom_client,
            //   montant: facture.montant,
            //   motif: facture.motif?.toString(),
            //   date: facture.datePaiment,
            // });
          });
          const f = document?.querySelector("#f") as HTMLFormElement;
          f.reset();
          // addInvoice({
          //   client
          // })
        } else {
          toast("Echec d'enregistrement", {
            theme: "dark",
            type: "error",
            autoClose: 1500,
          });
        }
      })
      .finally(() => {
        setSpinning(false);
      });
  };

  const clients = useQuery({ queryKey: ["clientsList"], queryFn: getClients })
    .data as IClient[];

  let listeClient: { value: string; label: string }[] = [];
  clients?.map((cl) => {
    listeClient.push({ value: cl.id, label: cl.nom_client });
  });

  return (
    <Spin spinning={spinning} indicator={<Loader2 className="animate-spin" />}>
      <ToastContainer />
      <Card>
        <CardHeader className="border-b border-gray-700">
          <div className="text-lg flex gap-3 items-center color-primary">
            <Grip size={18} strokeWidth={2} /> Nouvelle Facture
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-4">
            <Select name="client">
              {
                clients?.sort((a,b)=>a.nom_client.localeCompare(b.nom_client,"fr"))?.map((client,i)=>(
              <SelectItem key={client.id}>{client?.nom_client?.toUpperCase()}</SelectItem>
              ))}
            </Select>
            <Input type="date" name="date" label="Date montant" />
            <Input
              type="number"
              name="montant"
              label="Montant"
              placeholder="0.00"
            />

            <Input name="motif" label="Motif de la facture" />

            <div className="flex gap-3">
              <Button type="submit" color="primary">
                <AddNoteIcon w={12} /> Créer la facture
              </Button>
              <Button type="reset" className="bg-gray-100 text-gray-700">
                Annuler
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <Modal
        okText="Enregistrer"
        cancelText="Annuler"
        title="Ajout facture"
        open={showModalAddFacture}
        onCancel={() => setShowModalAddFacture(false)}
        onOk={() => {
          setSpinning(true);
          setShowModalAddFacture(false);
          addFacture();
        }}
      >
        Voulez-vous vraiment enregistrer ?
      </Modal>
    </Spin>
  );
}
