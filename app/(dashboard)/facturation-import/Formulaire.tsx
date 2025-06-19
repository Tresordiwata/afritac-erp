'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select, SelectItem, Button, Card, CardBody, CardHeader } from '@heroui/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { clients, trucks, goods } from '@/lib/mock-data';

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
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 grid grid-cols-1 md:grid-cols-1">
          <div className='grid grid-cols-3 gap-3'>
          <Select
          size='sm'
            label="Client"
            labelPlacement='outside'
            placeholder="Sélectionner un client"
            className="w-full"
            onChange={(e) => setValue('client', e.target.value)}
          >
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            size='sm'
            label="Numéro de manifeste"
            labelPlacement='outside'
            {...register('manifeste')}
          />

          <Input
            type="date"
            label="Date de facturation"
            {...register('dateFacturation')}
            labelPlacement='outside'
            size='sm'
          />
          </div>
           <Input
            type="text"
            label="T-1"
            placeholder="T-1"
            {...register('t1')}
          />
          

          <Input
            type="number"
            label="Poids"
            placeholder="Poids"
            {...register('poids')}
          />

         

          <Input
            type="text"
            label="Déclaration"
            placeholder="Numéro de déclaration"
            {...register('declaration')}
          />

          <Input
            type="date"
            label="Date de déclaration"
            {...register('dateDeclaration')}
          />

          <Input
            type="text"
            label="Liquidation"
            placeholder="Numéro de liquidation"
            {...register('liquidation')}
          />

          <Input
            type="date"
            label="Date de liquidation"
            {...register('dateLiquidation')}
          />

          <Input
            type="text"
            label="Quittance"
            placeholder="Numéro de quittance"
            {...register('quittance')}
          />

          <Input
            type="date"
            label="Date de quittance"
            {...register('dateQuittance')}
          />

          <Input
            type="number"
            label="Montant quittance"
            placeholder="Montant de la quittance"
            {...register('montantQuittance')}
          />

          <Select
            label="Camion"
            placeholder="Sélectionner un camion"
            className="w-full"
            onChange={(e) => setValue('camion', e.target.value)}
          >
            {trucks.map((truck) => (
              <SelectItem key={truck.id} value={truck.id.toString()}>
                {truck.number} - {truck.type}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Marchandises"
            placeholder="Sélectionner une marchandise"
            className="w-full"
            onChange={(e) => setValue('marchandises', e.target.value)}
          >
            {goods.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            label="Nombre de colis"
            placeholder="Nombre de colis"
            {...register('nbreColis')}
          />

          <div className="col-span-full mt-4">
            <Button color="primary" type="submit" className="w-full">
              Soumettre
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}