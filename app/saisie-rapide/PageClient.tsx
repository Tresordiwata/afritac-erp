"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  CardBody,
  Card,
  NumberInput,
  useDisclosure,
  Tab,
  Tabs,
} from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { PlusIcon, SaveAllIcon, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";

import LayoutSecond from "@/layouts/LayoutSecond";
import { getCamions } from "@/services/camion";
import { ICamion } from "@/lib/types/camion";
import { getMarchandises } from "@/services/marchandise";
import { IMarchandise } from "@/lib/types/marchandise";
import { getJournalNumeros } from "@/services/journalNumero";
import { IJournalNumero, IJournalType } from "@/lib/types/journalType";
import { getJournalTypes } from "@/services/journal";
import { ILigneFacture } from "@/lib/types/ligneFacture";
import ModalUsable from "@/reusables/ModalReusable";
import ModalWithForm from "@/reusables/ModalWithForm";
import { IRubriqueFacture } from "@/lib/types/rubriqueFacture";
import { getRubriqueFactures } from "@/services/rubriqueFacture";
import { DeleteIcon } from "@/styles/icones";

let formAdd: any = {};
const PageClient = ({
  montant,
  detail,
  dossier,
  client,
}: {
  montant?: number | any;
  detail?: any;
  dossier?: any;
  client?: any;
}) => {
  // const [camions, setCamions] = useState([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalAddRubrique, setModalAddRubrique] = useState<boolean>(false);
  const [rubriqueFactures, setRubriqueFactures] = useState<
    IRubriqueFacture[] | null
  >(null);
  const [rubriquesAdded, setRubriquesAdded] = useState<
    { rubrique: string; qt: string; prix: string; exonereTva: "Y" | "N" }[]
  >(detail || []);

  const montantFacture =
    rubriquesAdded?.reduce((p: any, a: any) => {
      return p + parseFloat(a.prix) * parseFloat(a.qt);
    }, 0) || 0;
  const [marchandises, setMarchandises] = useState([]);
  const [lignefactures, setLignefactures] = useState<ILigneFacture[] | any>([]);
  const [camions, setCamions] = useState([]);
  const [camionSelectedId, setCamionSelectedId] = useState<any>();
  const [marchandiseSelectedId, setMarchandiseSelectedId] = useState<any>();
  const [newCamionValue, setNewCamionValue] = useState<String | any>("");
  const [newMarchandiseValue, setNewMarchandiseValue] = useState<String | any>(
    "",
  );
  const [confirmSubmitForm, setConfirmSubmitForm] = useState<boolean | any>(
    false,
  );
  const [spinning, setSpinning] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

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

  const journaTypes = useQuery({
    queryKey: ["journalType"],
    queryFn: getJournalTypes,
  }).data as IJournalType[];

  let allRubriqueFactures = useQuery({
    queryKey: ["rub"],
    queryFn: getRubriqueFactures,
    refetchInterval: 3000,
  }).data as IRubriqueFacture[];

  const addNewCamion = () => {
    fetch("api/camion", {
      method: "POST",
      body: JSON.stringify({ libelle: newCamionValue }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r?.isExist) {
          toast("Camion existe deja", { theme: "dark", type: "info" });
          setCamionSelectedId(r?.data?.id);
        } else {
          toast("Bien ajoutée", { theme: "dark", type: "success" });
          setCamionSelectedId(r?.data?.id);
        }
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
    formAdd["detail"] = rubriquesAdded;

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

          // formulaire.reset();
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
  const afterSubmit = (data: IRubriqueFacture) => {
    allRubriqueFactures?.push({ ...data });
  };
  const ajoutRubrique = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formulaire = Object.fromEntries(new FormData(e.currentTarget)) as {
      rubrique: string;
      qt: string;
      prix: string;
      exonereTva: "Y" | "N";
    };

    toast("Bien ajouté", {
      type: "info",
      position: "bottom-right",
      theme: "light",
    });
    setRubriquesAdded([...rubriquesAdded, formulaire]);
  };

  useEffect(() => {
    setModalState(!modalState);
    setModalAddRubrique(!modalAddRubrique);
  }, []);

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
                defaultValue={montantFacture}
                endContent={"USD"}
                label="Montant facture"
                labelPlacement="outside"
                name="montant"
                size="sm"
                value={montantFacture}
              />
            </div>
            <div className="grid grid-cols-4 gap-3 ">
              <Input
                defaultValue={dossier}
                label="Dossiers"
                labelPlacement="outside"
                name="dossier"
                size="sm"
              />
              <Select
                className="w-full"
                defaultSelectedKeys={[client]}
                isRequired={true}
                label="Client"
                labelPlacement="outside"
                name="journalTypeId"
                placeholder="Sélectionner un client"
                selectionMode="single"
                size="sm"
                tabIndex={0}
              >
                {journaTypes?.map((jt, i) => (
                  <SelectItem key={jt.id}>{jt?.libelle}</SelectItem>
                ))}
              </Select>

              <Input
                defaultValue="2025"
                label="Numéro de manifeste"
                labelPlacement="outside"
                name="manifeste"
                size="sm"
                tabIndex={0}
                type="text"
              />

              <Input
                defaultValue={moment().format("YYYY-MM-DD")}
                label="Date de facturation"
                labelPlacement="outside"
                name="dateFacture"
                size="sm"
                type="date"
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
                isRequired={true}
                label="Camion"
                labelPlacement="outside"
                size="sm"
                unselectable="on"
                onSelectionChange={(e) => {
                  setCamionSelectedId(e?.toString());
                }}
                onValueChange={(e) => {
                  setNewCamionValue(e);
                }}
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
                    label="Déclaration"
                    labelPlacement="outside"
                    name="declarationDate"
                    type="date"
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
                    label="Date Liq"
                    labelPlacement="outside"
                    name="liquidationDate"
                    type="date"
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
                    label="Date Quitt."
                    labelPlacement="outside"
                    name="quittanceDate"
                    type="date"
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
              <Button
                className=""
                color="primary"
                startContent={<SaveAllIcon size={14} strokeWidth={1} />}
                type="submit"
              >
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
        <div className="mt-4">
          <Card>
            <CardBody>
              <Tabs color="primary" variant="underlined">
                <Tab key={"rubrique"} title="Rubrique">
                  <div className="flex flex-col gap-2">
                    <div className="text-end">
                      <Button
                        color="primary"
                        size="sm"
                        startContent={<Trash2 size={13} />}
                        onPress={() => {
                          setRubriquesAdded([]);
                        }}
                      >
                        Effacer
                      </Button>
                    </div>
                    <table className="w-full bg-default-100 rounded-md px-3 text-sm font-normal">
                      <thead>
                        <tr className="bg-primary-400 overflow-hidden">
                          <th className="py-2">Produit</th>
                          <th>Identifiant</th>
                          <th>Libellé</th>
                          <th>Compte</th>
                          <th>Compte Analy</th>
                          <th className="text-center">Quant</th>
                          <th className="text-center">Prix</th>
                          <th className="text-center">Taxes</th>
                          <th className="text-center">Sous-Toal</th>
                          <th className="text-center">Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rubriquesAdded?.map((ra, i) => (
                          <tr key={i}>
                            <td className="py-2">
                              {
                                allRubriqueFactures?.find((rf) => {
                                  return rf.id == ra.rubrique;
                                })?.produit
                              }
                            </td>
                            <td>
                              {
                                allRubriqueFactures?.find((rf) => {
                                  return rf.id == ra.rubrique;
                                })?.identifiant
                              }
                            </td>
                            <td>Libellé</td>
                            <td>Compte</td>
                            <td>Compte Analy</td>
                            <td className="text-center">{ra.qt}</td>
                            <td className="text-center">{ra.prix}</td>
                            <td className="text-center">
                              <div className="border-2 rounded-full px-1 py-0.5">
                                {ra.exonereTva == "Y"
                                  ? "Exoneré de TVA"
                                  : "TVA 16%(vente)"}
                              </div>
                            </td>
                            <td className="text-center">
                              {parseFloat(ra.prix) * parseFloat(ra.qt)}
                            </td>
                            <td className="text-center flex justify-center items-center pt-3">
                              <DeleteIcon />{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab>
                {/* <Tab>djksjdks</Tab> */}
              </Tabs>
              <Button
                isIconOnly={true}
                size="sm"
                variant="faded"
                onPress={() => {
                  setModalState(!modalState);
                }}
              >
                <PlusIcon size={12} />
              </Button>
            </CardBody>
          </Card>
        </div>
        <ModalUsable
          key={"ok"}
          hideFooter={false}
          isOpened={modalState}
          titre="Ajout ligne"
          onOk={() => {
            const btnsub = document?.querySelector(
              "#btnSbmt",
            ) as HTMLButtonElement;

            btnsub.click();
          }}
        >
          <form id="f" onSubmit={ajoutRubrique}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center justify-center">
                <Select
                  isRequired
                  label="Rubrique"
                  labelPlacement="outside"
                  name="rubrique"
                >
                  {allRubriqueFactures?.map((rubrique) => (
                    <SelectItem key={rubrique?.id}>
                      {rubrique?.libelle}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  color="default"
                  size="sm"
                  type="button"
                  variant="flat"
                  onPress={() => setModalAddRubrique(!modalAddRubrique)}
                >
                  créer
                </Button>
              </div>
              <div className="flex gap-3">
                <NumberInput
                  isRequired={true}
                  label="Quantité"
                  labelPlacement="outside"
                  min={0}
                  name="qt"
                />
                <NumberInput
                  isRequired
                  label="Prix"
                  labelPlacement="outside"
                  min={0}
                  name="prix"
                />
              </div>
              <Select
                label="Exoneré TVA"
                labelPlacement="outside"
                name="exonereTva"
              >
                <SelectItem key={"Y"}>Oui</SelectItem>
                <SelectItem key={"N"}>Non</SelectItem>
              </Select>
              {/* <div>
              <Button color="primary">Ajout</Button>
            </div> */}
            </div>
            <button className="hidden" id="btnSbmt" type="submit">
              sub
            </button>
          </form>
        </ModalUsable>
        <ModalWithForm
          action="POST"
          afterSubmitFn={afterSubmit}
          endPoint="rubrique-facture"
          isOpened={modalAddRubrique}
          titre="ajout Rubrique"
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Input label="Produit" labelPlacement="outside" name="produit" />
              <Input label="Libellé" labelPlacement="outside" name="libelle" />
            </div>
            <div className="flex gap-3">
              <Input label="Compte" labelPlacement="outside" name="compte" />
              <Input
                label="Compte Analytique"
                labelPlacement="outside"
                name="compteAnalytique"
              />
            </div>
            <Input
              label="Identifiant"
              labelPlacement="outside"
              name="identifiant"
            />
          </div>
        </ModalWithForm>
      </div>
    </LayoutSecond>
  );
};

export default PageClient;
