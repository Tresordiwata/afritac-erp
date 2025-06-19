"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import LayoutSecond from "@/layouts/LayoutSecond";
import { IClient } from "@/lib/types/client";
import ModalUsable from "@/reusables/ModalReusable";
import { EditDocumentIcon } from "@/styles/icones";
import { toast } from "react-toastify";

let formdata={}
const PageClient = ({ client }: { client?: IClient }) => {
    const [modalQuestion,setModalQuestion]=useState(false)
  const [spinning, setSpinning] = useState(false);
  const usp = useSearchParams();
  const id = usp.get("id");

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setModalQuestion(!modalQuestion)
    formdata=Object.fromEntries(new FormData(e.currentTarget))
  }

  const handleOK=async()=>{
    setModalQuestion(!modalQuestion)
    setSpinning(true)
    const req=await fetch("/api/client",{method:"PUT",body:JSON.stringify(formdata)})
    const rep=await req.json()
    if(req)
    {
     toast("Bien modifié",{type:"success", theme:"dark"})   
     setSpinning(false)
    }else{
        toast("Echec de modification",{ type:"warning",theme:"dark"})
        setSpinning(false)
    }
  }

useEffect(()=>{
    setModalQuestion(!modalQuestion)
},[])
  return (
    <LayoutSecond backable={true} titre={"Detail client"}>
      <Spin spinning={spinning}>
        <div>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardBody className="grid grid-cols-2 gap-6">
                <input type="hidden" name="id" value={client?.id} />
                <Input
                  defaultValue={client?.nom_client}
                  label="Nom client"
                  labelPlacement="outside"
                  name="nom_client"

                />

                <Input
                  defaultValue={client?.code}
                  label="Code"
                  labelPlacement="outside"
                  name="code"
                />

                <Input
                  defaultValue={client?.num_nif}
                  label="Numéro NIF"
                  labelPlacement="outside"
                  name="num_nif"
                />

                <Input
                  defaultValue={client?.rccm}
                  label="RCCM"
                  labelPlacement="outside"
                  name="rccm"
                />

                <Input
                  defaultValue={client?.idNat}
                  label="ID NAT"
                  labelPlacement="outside"
                  name="idnat"
                />

                <Input
                  defaultValue={client?.adresse}
                  label="Adresse"
                  labelPlacement="outside"
                  name="adresse"
                />

                <Input
                  defaultValue={client?.telephone}
                  label="Téléphone"
                  labelPlacement="outside"
                  name="telephone"
                />

                <Input
                  defaultValue={client?.email}
                  label="E-mail"
                  labelPlacement="outside"
                  name="email"
                  type="email"
                />

                <div className="flex flex-row justify-center w-full gap-6 mt-5">
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
              </CardBody>
              <CardFooter className="text-center border-t-1 justify-center border-gray-700">
                <Button type="submit" color="primary">Modifier enregistrement</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      <ModalUsable isOpened={modalQuestion} titre={<div className="flex flex-row gap-3 items-center"><EditDocumentIcon className="text-primary" />Modification</div>} onOk={handleOK}>
        <div>Voulez-vous modifier ?</div>
      </ModalUsable>
      </Spin>
    </LayoutSecond>
  );
};

export default PageClient;
