"use client";

import { useEffect, useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Alert, Checkbox, Input } from "@heroui/react";

import ClientCard from "./components/ClientCard";

import { getClients } from "@/services/client";
import { IClient } from "@/lib/types/client";
import { useClientStore } from "@/lib/store/client";
import ModalUsable from "@/reusables/ModalReusable";
import ModalWithForm from "@/reusables/ModalWithForm";
import LayoutSecond from "@/layouts/LayoutSecond";
import { useRouter } from "next/navigation";

let idSelected: any = null;

export default function ClientsPage() {
  const router=useRouter()
  const [modalDeleteState, setModalDeleteState] = useState(false);
  const [modalFormState, setModalFormState] = useState(false);
  const [spinning, setSpinning] = useState<boolean | undefined>(false);
  const [openedModalAdd, setOpenedModalAdd] = useState<boolean | undefined>(
    false,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { clients, addClient, updateClient } = useClientStore();

  const clientsAll = useQuery({
    queryKey: ["cl"],
    queryFn: getClients,
    refetchInterval: 2000,
  }).data as IClient[];

  const handleEdit = (client: IClient) => {
    setEditingId(client.id);
  };

  const handleDelete = (id: string) => {
    setShowDeleteModal(true);
    // deleteClient(id);
    idSelected = id;
  };
  const deleteClient = () => {
    setSpinning(true);
    fetch("/api/client", {
      method: "DELETE",
      body: JSON.stringify({ id: idSelected }),
    })
      .then((r) => {
        toast("Bien supprimé", {
          theme: "dark",
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((r) => {
        toast("Echec de suppression", { theme: "dark", type: "error" });
      })
      .finally(() => {
        setSpinning(false);
        setShowDeleteModal(false);
      });
  };

  useEffect(() => {
    setModalDeleteState(!false);
    setModalFormState(!false);
  }, []);

  return (
    <LayoutSecond
    backable={false}
      titre={
        <div className="w-full flex justify-between w-full flex-row">
          <h1 className="flex gap-2 text-3xl font-bold items-center text-start color-secondary">
            Gestion des Clients
          </h1>
          
        </div>
      }
    >
      <div className="mx-[0px] py-3 rounded-2xl p-3">
        <div className="flex items-end text-end w-full  justify-end">
        <Button
            color="primary"
            startContent={<PlusCircleIcon />}
            type="button"
            onPress={() => setModalFormState(!modalFormState)}
          >
            Nouveau client
          </Button>
      </div>
        <div className="rounded-lg">
          <div className="grid grid-cols-3 gap-3 flex-wrap p-3">
            {clientsAll?.length < 1 && (
              <Alert className="w-full text-center" color="warning">
                {"Aucun enregistrement n'a été trouvé"}
              </Alert>
            )}
            {clientsAll?.map((client, i) => (
              <ClientCard key={i} client={client} />
            ))}
          </div>
        </div>
        <ModalUsable
          cancelText="Annuler"
          isOpened={modalDeleteState}
          okText="Supprimer"
          titre="Suppression client"
          onOk={() => deleteClient()}
        >
          <div>Voulez-vous vraiment supprimer ce client ?</div>
        </ModalUsable>
        <ModalWithForm
          action="POST"
          endPoint="client"
          isOpened={modalFormState}
          titre="Ajout client"
        >
          <div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Nom client"
                labelPlacement="outside"
                name="nom_client"
              />

              <Input label="Code" labelPlacement="outside" name="code" />

              <Input
                label="Numéro NIF"
                labelPlacement="outside"
                name="num_nif"
              />

              <Input label="RCCM" labelPlacement="outside" name="rccm" />

              <Input label="ID NAT" labelPlacement="outside" name="idnat" />

              <Input label="Adresse" labelPlacement="outside" name="adresse" />

              <Input
                label="Téléphone"
                labelPlacement="outside"
                name="telephone"
              />

              <Input
                label="E-mail"
                labelPlacement="outside"
                name="email"
                type="email"
              />
            </div>

            <div className="flex flex-row gap-6 mt-5">
              <Checkbox
                isSelected={true}
                name="isFacturedForImport"
                onChange={() => {}}
              />{" "}
              Facturé pour Import
              <Checkbox
                isSelected={true}
                name="isFacturedForExport"
                onChange={() => {}}
              />{" "}
              Facturé pour Export
              <Checkbox
                isSelected={true}
                name="isFacturedForTva"
                onChange={() => {}}
              />{" "}
              Facturé pour TVA
            </div>
          </div>
        </ModalWithForm>
      </div>
    </LayoutSecond>
  );
}
