import { Input } from "@heroui/input";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  NumberInput,
} from "@heroui/react";
import { Calendar, LinkIcon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";

import ModalWithForm from "@/reusables/ModalWithForm";
import { IJournalType } from "@/lib/types/journalType";
import { EditIcon } from "@/styles/icones";
import { formatNombre } from "@/lib/utils";

const Detail = ({ props: journalType }: { props: IJournalType }) => {
  const [modalOpened, setModalOpened] = useState<boolean>(true);
  const [modalReferencePaiement, setModalReferencePaiement] =
    useState<boolean>(true);
  const [modalPaiement, setModalPaiement] = useState<boolean>(true);
  const [modalmodalSydoniaOpenedOpened, setModalmodalSydoniaOpenedOpened] =
    useState<boolean>(true);

  useEffect(() => {
    setModalOpened(!modalOpened);
    setModalPaiement(!modalPaiement);
    setModalReferencePaiement(!modalReferencePaiement);
    setModalmodalSydoniaOpenedOpened(!modalmodalSydoniaOpenedOpened);
  }, []);

  return (
    <div>
      <Card className="min-w-[300] light:bg-slate-300">
        <CardHeader className="text-primary font-bold ">
          {journalType.libelle}
        </CardHeader>
        <Divider />
        <CardBody className="text-sm">
          <div className="mb-3 flex gap-2 items-center justify-center font-bold bg-secondary-100 rounded-lg text-sm px-3 py-1 text-center">
            Solde : {formatNombre(journalType?.solde)} USD
            <LinkIcon size={12} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-start">
              Date dern. impr :
              {journalType?.derniereImpression ? (
                <>
                  <Chip
                    className="text-sm"
                    color="primary"
                    size="sm"
                    variant="bordered"
                  >
                    {journalType?.derniereImpression}
                  </Chip>
                  <Button
                    isIconOnly
                    size="sm"
                    startContent={<EditIcon size={12} />}
                    variant="light"
                    onPress={() => {
                      setModalOpened(!modalOpened);
                    }}
                  />
                </>
              ) : (
                <span className="flex gap-2 justify-center items-center italic text-sm bg-warning-100 px-2 py-0.5 rounded-full">
                  <Calendar size={12} /> Aucune date{" "}
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center justify-start">
              Date dern. impr sydonia :
              {journalType?.dernierImprSydonia ? (
                <>
                  <Chip
                    className="text-sm"
                    color="primary"
                    size="sm"
                    variant="bordered"
                  >
                    {journalType?.dernierImprSydonia}
                  </Chip>
                  <Button
                    isIconOnly
                    size="sm"
                    startContent={<EditIcon size={12} />}
                    variant="light"
                    onPress={() => {
                      setModalmodalSydoniaOpenedOpened(
                        !modalmodalSydoniaOpenedOpened,
                      );
                    }}
                  />
                </>
              ) : (
                <span className="italic bg-warning-100 px-2 py-0.5 rounded-full text-sm">
                  Aucune date
                </span>
              )}
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="text-sm text-blue-300 flex justify-between gap-5">
          <Button
            className="flex items-center gap-2"
            size="sm"
            variant="light"
            onPress={() => setModalPaiement(!modalPaiement)}
          >
            <Plus size={12} />
            Nouveau paiement
          </Button>
          <Button
            className="flex items-center gap-2"
            size="sm"
            variant="light"
            onPress={() => setModalReferencePaiement(!modalReferencePaiement)}
          >
            <Plus size={12} />
            Reference paiement
          </Button>
        </CardFooter>
      </Card>
      <ModalWithForm
        key={"1"}
        action="POST"
        endPoint="journalType_update_date_impr"
        isOpened={!modalOpened}
        okText={"Enregistrer"}
        titre={`Ajout date impr / ${journalType?.libelle}`}
      >
        <div>
          <Input name="id" type="hidden" value={journalType?.id} />
          <Input name="contenu" type="text" />
        </div>
      </ModalWithForm>
      <ModalWithForm
        key={"2"}
        action="POST"
        endPoint="journalType_update_date_impr_sydonia"
        isOpened={!modalmodalSydoniaOpenedOpened}
        okText={"Enregistrer"}
        titre={`Ajout date impr sydonia | ${journalType?.libelle}`}
      >
        <div>
          <Input name="id" type="hidden" value={journalType?.id} />
          <Input name="contenu" type="text" />
        </div>
      </ModalWithForm>
      <ModalWithForm
        key={"3"}
        action="POST"
        endPoint="paiement-import"
        isOpened={!modalPaiement}
        okText={"Enregistrer"}
        titre={`Paiement | ${journalType?.libelle}`}
      >
        <div className="flex flex-col gap-1">
          <Input name="id" type="hidden" value={journalType?.id} />
          <NumberInput
            endContent={"USD"}
            label="Montant"
            labelPlacement="outside"
            name="montant"
            size="sm"
            type="text"
          />
          <div className="flex gap-3">
            <Input
              label="Justification"
              labelPlacement="outside"
              name="justification"
              size="sm"
              type="text"
            />
            <Input
              label="Date paiement"
              labelPlacement="outside"
              name="datePaiem"
              size="sm"
              type="date"
            />
          </div>
        </div>
      </ModalWithForm>
      <ModalWithForm
        key={"4"}
        action="POST"
        endPoint="reference-paiement-import"
        isOpened={!modalReferencePaiement}
        okText={"Enregistrer"}
        titre={`Référence paiem. | ${journalType?.libelle}`}
      >
        <div className="flex flex-col gap-4">
          <Input name="id" type="hidden" value={journalType?.id} />
          <Input
            defaultValue={moment().format("YYYY-MM-DD")}
            label="Date reference"
            labelPlacement="outside"
            name="dateReference"
            type="date"
          />
          <div className="flex gap-3">
            <Input
              isRequired={true}
              label="Libellé"
              labelPlacement="outside"
              name="libelle"
              type="text"
            />
            <NumberInput
              endContent={"USD"}
              isRequired={true}
              label="Montant"
              labelPlacement="outside"
              name="montant"
              type="text"
            />
          </div>
          <Input
            label="Description"
            labelPlacement="outside"
            name="description"
            type="text"
          />
        </div>
      </ModalWithForm>
    </div>
  );
};

export default Detail;
