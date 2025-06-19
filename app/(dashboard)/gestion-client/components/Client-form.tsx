"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Grip, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils2";
import { Button } from "@heroui/button";

import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useClientStore as useClientStore2 } from "@/lib/store/client";
import { IClient } from "@/lib/types/client";
import { Divider, Spin, Button as btnAnt, Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/getData";
import { ToastContainer, toast } from "react-toastify";

const ClientForm = () => {
  const [spinning, setSpinning] = useState<boolean | undefined>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { clients, addClient, updateClient } = useClientStore2();

  const formSchema = z.object({
    nom_client: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    code: z.string().min(0, "Le code est requis").optional().nullable(),
    num_nif: z
      .string()
      .min(2, "Le numéro NIF est requis")
      .optional()
      .nullable(),
    rccm: z.string().min(0, "Le numéro RCCM est requis").optional().nullable(),
    idnat: z
      .string()
      .min(0, "Le numéro IDNAT est requis")
      .optional()
      .nullable(),
    adresse: z.string().min(0, "L'adresse est requise").optional().nullable(),
    telephone: z
      .string()
      .min(0, "Le téléphone est requis")
      .optional()
      .nullable(),
    // email: z.string().email("Email invalide").optional().nullable(),
    email: z.string().min(0, "").optional().nullable(),
    isFacturedForImport: z.boolean(),
    isFacturedForExport: z.boolean(),
    isFacturedForTva: z.boolean(),
    lastPrintedDeclation: z.date().nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_client: "",
      code: "",
      num_nif: "",
      rccm: "",
      idnat: "",
      adresse: "",
      telephone: "",
      email: "",
      isFacturedForImport: false,
      isFacturedForExport: false,
      isFacturedForTva: false,
      lastPrintedDeclation: null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    if (editingId) {
      updateClient(editingId, { ...values, id: editingId });
      setEditingId(null);
    } else {
      setSpinning(true);
      fetch("/api/client", { method: "POST", body: JSON.stringify(values) })
        .then((r) =>
          toast("Bien enregistre", { type: "success", theme: "dark" })
        )
        .finally(() => {
          setSpinning(false);
        });

      // addClient({ ...values, id: crypto.randomUUID() });
    }
    form.reset();
  };

  return (
    <div>
      <Spin spinning={spinning}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          

          {/* <FormField
              control={form.control}
              name="lastPrintedDeclation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dernière Déclaration Imprimée</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
        </form>
      </Spin>
    </div>
  );
};

export default ClientForm;
