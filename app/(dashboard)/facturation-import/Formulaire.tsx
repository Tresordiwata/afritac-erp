"use client";

import { useForm } from "react-hook-form";
import { Input, Select, SelectItem, Button } from "@heroui/react";

import { clients, trucks, goods } from "@/lib/mock-data";

type FormData = {
  client: string;
  manifeste: string;
  dateFacturation: string;
  poids: string;
  t1: string;
  declaration: string;
  dateDeclaration: string;
  liquidation: string;
  dateLiquidation: string;
  quittance: string;
  dateQuittance: string;
  montantQuittance: string;
  camion: string;
  marchandises: string;
  nbreColis: string;
};

export default function Formulaire() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-3 justify-center">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Formulaire de Déclaration</p>
        </div>
      </div>
      <div>
        <form
          className="gap-6 grid grid-cols-1 md:grid-cols-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-3">
            <Select
              className="w-full"
              label="Client"
              labelPlacement="outside"
              placeholder="Sélectionner un client"
              size="sm"
              onChange={(e) => setValue("client", e.target.value)}
            >
              {clients.map((client) => (
                <SelectItem key={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Numéro de manifeste"
              labelPlacement="outside"
              size="sm"
              type="text"
              {...register("manifeste")}
            />

            <Input
              label="Date de facturation"
              type="date"
              {...register("dateFacturation")}
              labelPlacement="outside"
              size="sm "
            />
          </div>
          <Input
            label="T-1"
            placeholder="T-1"
            type="text"
            {...register("t1")}
          />

          <Input
            label="Poids"
            placeholder="Poids"
            type="number"
            {...register("poids")}
          />

          <Input
            label="Déclaration"
            placeholder="Numéro de déclaration"
            type="text"
            {...register("declaration")}
          />

          <Input
            label="Date de déclaration"
            type="date"
            {...register("dateDeclaration")}
          />

          <Input
            label="Liquidation"
            placeholder="Numéro de liquidation"
            type="text"
            {...register("liquidation")}
          />

          <Input
            label="Date de liquidation"
            type="date"
            {...register("dateLiquidation")}
          />

          <Input
            label="Quittance"
            placeholder="Numéro de quittance"
            type="text"
            {...register("quittance")}
          />

          <Input
            label="Date de quittance"
            type="date"
            {...register("dateQuittance")}
          />

          <Input
            label="Montant quittance"
            placeholder="Montant de la quittance"
            type="number"
            {...register("montantQuittance")}
          />

          <Select
            className="w-full"
            label="Camion"
            placeholder="Sélectionner un camion"
            onChange={(e) => setValue("camion", e.target.value)}
          >
            {trucks.map((truck) => (
              <SelectItem key={truck?.id}>
                {truck.number} - {truck.type}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="w-full"
            label="Marchandises"
            placeholder="Sélectionner une marchandise"
            onChange={(e) => setValue("marchandises", e.target.value)}
          >
            {goods.map((item) => (
              <SelectItem key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Nombre de colis"
            placeholder="Nombre de colis"
            type="number"
            {...register("nbreColis")}
          />

          <div className="col-span-full mt-4">
            <Button className="w-full" color="primary" type="submit">
              Soumettre
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
