"use client";

import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Grip, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { NumberInput, Select, SelectItem } from "@heroui/react";

import { IClient } from "@/lib/types/client";
import { IPaiement } from "@/lib/types/paiement";
import { IInvoice } from "@/lib/types/invoice";
import { getClients } from "@/services/getData";
import { useInvoiceStore } from "@/lib/store/invoice";
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
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    setShowModalAddFacture(true);
    // console.log(JSON.stringify(formData))
    formvalues = { ...formData };
    // addInvoice({
    //   client: values.client,
    //   montant: values.montant,
    //   motif: values.motif,
    //   date: values.date,
    // });
    // form.reset();
  };

  const addFacture = () => {
    const f = document?.querySelector("#f") as HTMLFormElement;

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
    <Spin indicator={<Loader2 className="animate-spin" />} spinning={spinning}>
      <ToastContainer />
      <Card>
        <CardHeader className="border-b border-gray-700">
          <div className="text-lg flex gap-3 items-center color-primary">
            <Grip size={18} strokeWidth={2} /> Nouvelle Facture
          </div>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" id="f" onSubmit={onSubmit}>
            <Select name="client">
              {clients
                ?.sort((a, b) => a.nom_client.localeCompare(b.nom_client, "fr"))
                ?.map((client, i) => (
                  <SelectItem key={client.id}>
                    {client?.nom_client?.toUpperCase()}
                  </SelectItem>
                ))}
            </Select>
            <Input label="Date montant" name="date" type="date" />
            <NumberInput
              label="Montant"
              min={10}
              name="montant"             
            />

            <Input label="Motif de la facture" name="motif" />

            <div className="flex gap-3">
              <Button color="primary" type="submit">
                <AddNoteIcon w={12} /> Créer la facture
              </Button>
              <Button className="bg-gray-100 text-gray-700" type="reset">
                Annuler
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <Modal
        cancelText="Annuler"
        okText="Enregistrer"
        open={showModalAddFacture}
        title="Ajout facture"
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
