import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { IClient } from "@/lib/types/client";
import { IJournalType } from "@/lib/types/journalType";
import FormSimple from "@/reusables/FormSimple";
import { getClients2 } from "@/services/client";
import { getJournalTypes } from "@/services/journal";
import { EditIcon } from "@/styles/icones";

const Journal = () => {
  const clients = useQuery({ queryKey: ["util"], queryFn: getClients2 })
    .data as IClient[];
  const journalTypes = useQuery({
    queryKey: ["jt"],
    queryFn: getJournalTypes,
  }).data as IJournalType[];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="text-secondary-500 border-b border-gray-700">
          Actualisation numero fact
        </CardHeader>
        <CardBody>
          <FormSimple action="POST" endPoint="journalNumero">
            <div className="flex flex-col gap-4">
              <Select
                isRequired
                label="Type Journal"
                labelPlacement="outside"
                name="journalType"
                size="md"
              >
                {journalTypes
                  ?.sort((a, b) => a.libelle.localeCompare(b.libelle, "fr"))
                  .map((journalType, i) => (
                    <SelectItem key={journalType?.id}>
                      {journalType?.libelle}
                    </SelectItem>
                  ))}
              </Select>
              <div className="flex gap-2 items-center justify-center">
                <NumberInput
                  isRequired
                  defaultValue={1}
                  label="Dernier num"
                  labelPlacement="outside"
                  name="numero"
                />
              </div>
            </div>
          </FormSimple>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="text-secondary-500 border-b border-gray-700">
          Création journal
        </CardHeader>
        <CardBody>
          <Tabs>
            <Tab key={"form"} title="Mise à jour">
              <FormSimple
                action="POST"
                endPoint="journalType"
                okText="Enregistrer"
              >
                <div className="flex flex-col gap-4">
                  <Select
                    isRequired={true}
                    label="Client"
                    labelPlacement="outside"
                    name="client"
                    size="md"
                  >
                    {clients?.map((client, i) => (
                      <SelectItem key={client.id}>
                        {client.nom_client}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="libellé"
                    labelPlacement="outside"
                    name="libelle"
                  />
                  <div className="flex gap-2 items-center justify-center">
                    <Input
                      isRequired={true}
                      label="format journal"
                      labelPlacement="outside"
                      name="formatJournal"
                    />
                    {/* <Button>Enregistrer</Button> */}
                  </div>
                </div>
              </FormSimple>
            </Tab>
            <Tab key={"liste"} title="Liste">
              <table className="w-full border rounded-md px-3 border-gray-700">
                <thead>
                  <tr className="text-center bg-gray-600 light:text-white">
                    <th>Client</th>
                    <th>Libellé</th>
                    <th>Format</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {journalTypes?.map((journalType, i) => (
                    <tr key={i} className="text-center py-3">
                      <td className="py-3">
                        {journalType?.Client?.nom_client}
                      </td>
                      <td>{journalType?.libelle}</td>
                      <td>{journalType?.formatJournal}</td>
                      <td>
                        <Button
                          isIconOnly
                          size="sm"
                          startContent={<EditIcon />}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Journal;
