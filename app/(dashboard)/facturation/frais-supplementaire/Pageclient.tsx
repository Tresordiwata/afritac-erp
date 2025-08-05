"use client";
import {
  Button,
  Select,
  SelectItem,
  Tab,
  Tabs,
  NumberInput,
  Input,
  Card,
  CardBody,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LayoutSecond from "@/layouts/LayoutSecond";
import ModalWithForm from "@/reusables/ModalWithForm";
import { getJournalTypes } from "@/services/journal";
import { IJournalType } from "@/lib/types/journalType";
import { getFraisSupplementaires } from "@/services/fraisSupplementaire";
import { IFraisSupplementaire } from "@/lib/types/fraisSupplementaire";
import { DeleteIcon } from "@/styles/icones";
import { CheckCheckIcon } from "lucide-react";
import ModalUsable from "@/reusables/ModalReusable";

const Pageclient = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalSuppressionOpened, setModalSuppressionOpened] = useState<boolean>(false);

  const fraisSupplementaires = useQuery({
    queryKey: ["frais"],
    queryFn: getFraisSupplementaires,
  }).data as IFraisSupplementaire[];
  const clients: IJournalType[] | any = useQuery({
    queryKey: ["clients"],
    queryFn: getJournalTypes,
  }).data;

  useEffect(() => {
    setModalOpened(!modalOpened);
    setModalSuppressionOpened(!modalSuppressionOpened);
  }, []);

  return (
    <LayoutSecond backable={true} titre={"Frais supplementaires"}>
      <>
        <div>
          <div className="text-end mb-4">
            <Button
              color="success"
              onPress={() => setModalOpened(!modalOpened)}
            >
              Ajouter
            </Button>
          </div>
          {/* <Divider /> */}
          <Card>
            <CardBody>
              <Tabs className="mt-3" color="primary" variant="light">
                <Tab title="Non facturés">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary-100">
                        <th className="py-4 px-2">Client</th>
                        <th className="px-2">Véhicule</th>
                        <th className="px-2">Montant</th>
                        <th className="px-2">Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fraisSupplementaires?.filter(fs=>{return fs.isFactured==false}).map((frais, index) => (
                        <tr key={index} className="">
                          <td className="py-2">{frais?.journalType?.libelle}</td>
                          <td>{frais?.vehicule}</td>
                          <td>{frais?.montant} {frais?.devise}</td>
                          <td className="flex gap-3 items-center justify-center pt-3">
                            <Button color="success" startContent={<CheckCheckIcon size={14} />} isIconOnly={true} size="sm" />
                            <Button color="warning" isIconOnly={true} size="sm" onPress={()=>setModalSuppressionOpened(!modalSuppressionOpened)}><DeleteIcon /></Button>
                          </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
                <Tab title="Facturés">Non facturés</Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
        <ModalWithForm
          action="POST"
          endPoint="frais-supplementaire"
          isOpened={modalOpened}
          okText="Enregistrer"
          titre="Ajout frais"
        >
          <>
            <Select
              isRequired={true}
              label="Client"
              labelPlacement="outside"
              name="client"
              size="sm"
            >
              {clients?.map((journalType: IJournalType, i: any) => (
                <SelectItem key={journalType?.id}>
                  {journalType?.libelle}
                </SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              label="Camion"
              labelPlacement="outside"
              name="camion"
              size="sm"
            />
            <div className="flex gap-3 mt-4">
              <NumberInput
                isRequired={true}
                label="Montant"
                labelPlacement="outside"
                min={1}
                name="montant"
                size="sm"
              />
              <Select
                defaultSelectedKeys={["USD"]}
                isRequired={true}
                label="devise"
                labelPlacement="outside"
                name="devise"
                size="sm"
              >
                <SelectItem key={"USD"}>USD</SelectItem>
                <SelectItem key={"CDF"}>CDF</SelectItem>
              </Select>
            </div>
          </>
        </ModalWithForm>
        <ModalUsable isOpened={modalSuppressionOpened} titre={<div className="flex items-center gap-4"><DeleteIcon /> Suppression</div>} onOk={()=>{alert("ok")}}>
          <div>
            Voulez-vous vraiment supprimer ?
          </div>
        </ModalUsable>
      </>
    </LayoutSecond>
  );
};

export default Pageclient;
