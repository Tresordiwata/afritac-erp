"use client";
import {
  Button,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import LayoutSecond from "@/layouts/LayoutSecond";
import PageContent from "@/layouts/PageContent";
import ModalUsable from "@/reusables/ModalReusable";
import { IUtilisateur } from "@/lib/types/utilisateur";

let dataToSend = {};
const ProfilPageClient = ({profil}:{profil:IUtilisateur}) => {
  const [spinning, setSpinning] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalText, setModalText] = useState("");
  const [fctOfOkModal, setFctOfOkModal] = useState<any>(null);

  const handleSubmit = (f: React.FormEvent<HTMLFormElement>) => {
    f.preventDefault();
    const formData = Object.fromEntries(new FormData(f.currentTarget));

    dataToSend = formData;
    if (formData?.newPwd !== formData?.newPwd2) {
      setModalText("Les 2 mots de passes ne correspondent pas");
      setFctOfOkModal(null);
      setModalOpened(!modalOpened);
    } else {
      setModalText("Voulez-vous vraiment modifier");
      setFctOfOkModal("validated");
      setModalOpened(!modalOpened);
    }
  };
  const handleSubmitModal = () => {
    if (fctOfOkModal == "validated") {
      setModalOpened(!modalOpened);
      setSpinning(true);
      fetch("/api/auth/updatepassword", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            setSpinning(false);
            toast("Bien modifié", { theme: "dark", type: "success" });
          } else {
            toast(r.msg, { type: "error", theme: "dark" });
          }
        })
        .catch((e) => {
          toast("Echec de modification", { type: "error", theme: "dark" });
        })
        .finally(() => {
          setSpinning(false);
        });
    }
  };

  useEffect(() => {
    setModalOpened(!modalOpened);
  }, []);

  return (
    <LayoutSecond titre={"Mon Compte"}>
      <>
       
        <ModalUsable
          isOpened={modalOpened}
          titre="Modification mot de passe"
          onOk={handleSubmitModal}
        >
          <div>{modalText}</div>
        </ModalUsable>s
      </>
    </LayoutSecond>
  );
};

export default ProfilPageClient;
