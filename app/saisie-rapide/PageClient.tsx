"use client";
import React, { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  DatePicker,
  CardBody,
  Card,
  NumberInput,
  useDisclosure,
} from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { now, getLocalTimeZone } from "@internationalized/date";
import { SaveAllIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import LayoutSecond from "@/layouts/LayoutSecond";
import { getCamions } from "@/services/camion";
import { ICamion } from "@/lib/types/camion";
import { getMarchandises } from "@/services/marchandise";
import { IMarchandise } from "@/lib/types/marchandise";
import { getJournalNumeros } from "@/services/journalNumero";
import { IJournalNumero } from "@/lib/types/journalType";
import moment from "moment";

let formAdd = {};
const PageClient = () => {
  // const [camions, setCamions] = useState([]);
  const [marchandises, setMarchandises] = useState([]);
  const [camions, setCamions] = useState([]);
  const [camionSelectedId, setCamionSelectedId] = useState();
  const [marchandiseSelectedId, setMarchandiseSelectedId] = useState();
  const [newCamionValue, setNewCamionValue] = useState<String | any>("");
  const [newMarchandiseValue, setNewMarchandiseValue] = useState<String | any>(
    "",
  );
  const [confirmSubmitForm, setConfirmSubmitForm] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [saving, setSaving] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const allCamions = useQuery({ queryKey: ["camions"], queryFn: getCamions })
    .data as ICamion[];
  const allMarchandises = useQuery({
    queryKey: ["marchandises"],
    queryFn: getMarchandises,
  }).data as IMarchandise[];
  const allClients = useQuery({
    queryKey: ["clients"],
    queryFn: getJournalNumeros,
  }).data as IJournalNumero[];

  const addNewCamion = () => {
    fetch("api/camion", {
      method: "POST",
      body: JSON.stringify({ libelle: newCamionValue }),
    })
      .then((r) => r.json())
      .then((r) => {
        toast("Bien ajouté", { theme: "dark", type: "success" });
        setCamionSelectedId(r?.id);
      });
  };
  const addNewMarchandise = () => {
    fetch("api/marchandise", {
      method: "POST",
      body: JSON.stringify({ libelle: newMarchandiseValue }),
    })
      .then((r) => r.json())
      .then((r) => {
        toast("Bien ajouté", { theme: "dark", type: "success" });
        setMarchandiseSelectedId(r?.id);
      });
  };

  const handleSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formAdd = Object.fromEntries(new FormData(e.currentTarget));

    setConfirmSubmitForm(true);
  };

  const confirmHandleSubmtAdd = () => {
    setSpinning(true);
    setSaving(true);
    fetch(`/api/facturationImport`, {
      method: `POST`,
      body: JSON.stringify(formAdd),
    })
      .then((r) => r.json())
      .then((response) => {
        toast("Bien enregistré", { theme: "dark", type: "success" });

        if (response !== null) {
          setConfirmSubmitForm(false);
          const formulaire = document.querySelector("#f") as HTMLFormElement;

          formulaire.reset();
          onOpenChange();
        }
      })
      .catch(() => {
        toast("Echec d'operation", { theme: "dark", type: "error" });
      })
      .finally(() => {
        setSaving(false);
        setSpinning(false);
      });
  };

  return (
    <LayoutSecond backable={true} titre={"Saisie rapide"}>
      <div className="w-full mx-auto">
        {/* <div className="flex gap-3 justify-center border-b border-gray-800 mb-4 py-2">
          <div className="flex flex-col">
            <p className="text-xl font-bold">Facturation Déclaration</p>
          </div>
        </div> */}
        <div>
          <form
            className="gap-6 grid grid-cols-1 md:grid-cols-1"
            id="f"
            onSubmit={handleSubmitAdd}
          >
            <div className="grid grid-cols-5 gap-3">
              <input name="niveauSaisie" type="hidden" value={"R"} />
              <Select
                defaultSelectedKeys={["C"]}
                label="Type facturation"
                labelPlacement="outside"
                name="typeFact"
                size="sm"
              >
                <SelectItem key={"C"}>Consommable</SelectItem>
                <SelectItem key={"G"}>Global</SelectItem>
                <SelectItem key={"E"}>Equipement</SelectItem>
              </Select>
              <NumberInput
                isDisabled
                defaultValue={600}
                endContent={"USD"}
                label="Montant facture"
                labelPlacement="outside"
                name="montant"
                size="sm"
              />
            </div>
            <div className="grid grid-cols-4 gap-3 ">
              <Input size="sm" defaultValue="REG SOM" label="Dossier" labelPlacement="outside" name="dossier" />
              <Select
                className="w-full"
                label="Client"
                labelPlacement="outside"
                name="journalTypeId"
                placeholder="Sélectionner un client"
                size="sm"
                tabIndex={0}
                isRequired={true}
              >
                {allClients?.map((client, i) => (
                  <SelectItem key={client.id}>
                    {client?.journalType?.libelle}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Numéro de manifeste"
                labelPlacement="outside"
                name="manifeste"
                size="sm"
                type="text"
                defaultValue="2025"
                tabIndex={0}
              />

              <Input
              type="date"
                defaultValue={moment().format("YYYY-MM-DD")}
                label="Date de facturation"
                labelPlacement="outside"
                name="dateFacture"
                size="sm"
              />
            </div>
            <div className="flex gap-3">
              <Input
                isRequired={true}
                label="T-1"
                labelPlacement="outside"
                name="t1"
                size="sm"
              />
              <Autocomplete
                allowsCustomValue
                className="max-w-xs"
                label="Camion"
                labelPlacement="outside"
                size="sm"
                unselectable="on"
                isRequired={true}
                onSelectionChange={(e) => {
                  setCamionSelectedId(e?.toString());
                }}
                onValueChange={(e) => setNewCamionValue(e)}
              >
                {allCamions?.map((camion) => (
                  <AutocompleteItem key={camion.id}>
                    {camion.libelle}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Button
                isIconOnly
                className="mt-5"
                size="sm"
                startContent={<SaveAllIcon size={13} />}
                type="button"
                onPress={() => addNewCamion()}
              />
              <Autocomplete
                className="max-w-xs"
                label="Marchandise"
                labelPlacement="outside"
                size="sm"
                unselectable="on"
                onSelectionChange={(e) => {
                  setMarchandiseSelectedId(e?.toString());
                }}
                onValueChange={(e) => setNewMarchandiseValue(e)}
              >
                {allMarchandises?.map((marchandise) => (
                  <AutocompleteItem key={marchandise.id}>
                    {marchandise.libelle}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Button
                isIconOnly
                className="mt-5"
                size="sm"
                startContent={<SaveAllIcon size={13} />}
                type="button"
                onPress={() => addNewMarchandise()}
              />
            </div>
            <div className="flex gap-4">
              <input name="camionId" type="hidden" value={camionSelectedId} />
              <input
                name="marchandiseId"
                type="hidden"
                value={marchandiseSelectedId}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Card>
                <CardBody className="flex flex-row gap-3">
                  <Input
                    label="Déclaration"
                    labelPlacement="outside"
                    name="declarationId"
                  />
                  <Input
                    type="date"
                    label="Déclaration"
                    labelPlacement="outside"
                    name="declarationDate"
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex flex-row gap-3">
                  <Input
                    label="Liquidation"
                    labelPlacement="outside"
                    name="liquidationId"
                  />
                  <Input 
                    type="date"
                    label="Date Liq"
                    labelPlacement="outside"
                    name="liquidationDate"
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex flex-row gap-3">
                  <Input
                    label="Quittance"
                    labelPlacement="outside"
                    name="quittanceId"
                  />
                  <Input
                    type="date"
                    label="Date Quitt."
                    labelPlacement="outside"
                    name="quittanceDate"
                  />
                </CardBody>
              </Card>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <NumberInput
                label="Montant quitt."
                labelPlacement="outside"
                min={0}
                name="quittanceMontant"
                size="sm"
              />
              <NumberInput
                label="Poids"
                labelPlacement="outside"
                min={0}
                name="poids"
                size="sm"
              />
              <NumberInput
                label="Nbre Colis"
                labelPlacement="outside"
                min={0}
                name="colis"
                size="sm"
              />
            </div>
            <div className="col-span-full mt-4 text-center">
              <Button className="" color="primary" type="submit">
                Soumettre
              </Button>
            </div>
            {confirmSubmitForm && (
              <div className="bg-default/40 rounded-md items-center justify-center w-full text-sm p-3 flex gap-3">
                Voulez-vous vraiment enregistrer ?
                <Button
                  className="text-white"
                  color="success"
                  isLoading={saving}
                  size="sm"
                  onPress={() => confirmHandleSubmtAdd()}
                >
                  Confirmer
                </Button>
                <Button size="sm" onPress={() => setConfirmSubmitForm(false)}>
                  Annuler
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </LayoutSecond>
  );
};

export default PageClient;
