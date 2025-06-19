import { Card, CardBody, CardHeader } from "@heroui/card";
import React, { useEffect, useState } from "react";
import { EllipsisVertical, Loader2 } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Spin } from "antd";

import { IClient } from "@/lib/types/client";
import {
  AddNoteIcon,
  DeleteDocumentIcon,
  EditDocumentIcon,
} from "@/styles/icones";
import ModalUsable from "@/reusables/ModalReusable";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClientCard = ({ client }: { client: IClient }) => {
  const router=useRouter()
  const [modalDeleteState, setModalDeleteState] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const items = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facturer Import
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facturer Export
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facturer Tva
        </a>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Paiement Import
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Paiement Export
        </a>
      ),
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: <div className="text-blue-500">Modifier</div>,
      key: "5",
    },
    {
      label: <div className="text-red-500npx ">Supprimer</div>,
      key: "6",
    },
  ];
  const handleDelete = (e: any) => {
    setModalDeleteState(!modalDeleteState);
  };
  const handleDeleteSuccess = () => {
    setModalDeleteState(!modalDeleteState);
    setSpinning(true);
    fetch("api/client", {
      method: "DELETE",
      body: JSON.stringify({ id: client.id }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r) {
          toast("Bien supprimé", { type: "success", theme: "dark" });
        }
      }).catch(e=>{
        toast("Echec de suppression", { type: "error", theme: "dark" });
      }).finally(()=>{
        setSpinning(false)
      })
  };

  useEffect(() => {
    setModalDeleteState(!modalDeleteState);
  }, []);

  return (
    <Spin indicator={<Loader2 className="animate-spin" />} spinning={spinning}>
      <Card className="rounded hover:cursor-pointer dark:bg-slate-800 light:bg-blue-500">
        <CardHeader>
          <div className="flex flex-row justify-between w-full">
            <div className="color-primary">{client.nom_client}</div>
            {/* <Dropdown menu={{ items }} trigger={["click"]}>
            <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
              <EllipsisVertical strokeWidth={1.3} />
            </a>
          </Dropdown> */}
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly={true} size="sm" variant="flat">
                  <EllipsisVertical size={12} />{" "}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with icons"
                variant="faded"
              >
                <DropdownItem key="new" startContent={<AddNoteIcon />}>
                  Facturer Import
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  startContent={<AddNoteIcon className={"iconClasses"} />}
                >
                  Facturer Export
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  startContent={<AddNoteIcon className={"iconClasses"} />}
                >
                  Facturer TVA
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  onPress={()=>router.push(`/gestion-client/detail/?id=${client.id}`)}
                  className="text-success-200"
                  color="success"
                  startContent={<EditDocumentIcon className="text-success" />}
                >
                  Modifier
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  shortcut="⌘⇧D"
                  startContent={<DeleteDocumentIcon className="text-danger" />}
                  onPress={handleDelete}
                >
                  Supprimer
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <div>NIF : {client.num_nif}</div>
        </CardBody>
      </Card>
      <ModalUsable
        isOpened={modalDeleteState}
        titre="Suppression"
        onOk={handleDeleteSuccess}
      >
        <div>Voulez-vous vraiment supprimer ?</div>
      </ModalUsable>
    </Spin>
  );
};

export default ClientCard;
