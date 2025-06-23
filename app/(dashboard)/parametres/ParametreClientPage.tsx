"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
  Alert,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Lock, Building2, User, BuildingIcon, ChartBarBig } from "lucide-react";
import { useEffect, useState } from "react";


import Utilisateur from "./components/Utilisateur";
import ModalWithForm from "@/reusables/ModalWithForm";
import ModalAntReusable from "@/reusables/ModalAntReusable";
import { useAuthStore } from "@/lib/store/authStore";
import { IUtilisateur } from "@/lib/types/utilisateur";
import Camion from "./components/Camion";
import Marchandise from "./components/Marchandise";
import Journal from "./components/Journal";

const profilSchema = z.object({
  email: z.string().email("Email invalide"),
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
});

const motDePasseSchema = z
  .object({
    ancienMotDePasse: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    nouveauMotDePasse: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmationMotDePasse: z.string(),
  })
  .refine((data) => data.nouveauMotDePasse === data.confirmationMotDePasse, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationMotDePasse"],
  });

type ProfilForm = z.infer<typeof profilSchema>;
type MotDePasseForm = z.infer<typeof motDePasseSchema>;


let formAdd = {};

export default function ParametreClientPage({
  profil,
}: {
  profil: IUtilisateur;
}) {
  const utilisateur = useAuthStore((state) => state.utilisateur);
  const setAuth = useAuthStore((state) => state.setAuth);

  //  Pour Modal
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAntAdd, setModalAntAdd] = useState<Date | null>(null);

  useEffect(() => {
    setModalAdd(!modalAdd);
    setModalAntAdd(modalAntAdd == null ? null : new Date());
  }, []);
  // Fin Modal

  const onSubmitProfil = async (data: ProfilForm) => {
    try {
      const response = await fetch(`/api/utilisateurs/${utilisateur?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      const utilisateurMisAJour = await response.json();

      // setAuth(utilisateurMisAJour, utilisateur?.token || "");
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  const handleOkAnt = () => {
    // alert("ok")
  };
  const handleOkHeroUiModal = () => {
    alert("ok");
    // setModalAdd(!modalAdd)
  };

  if (profil.role == "UTILISATEUR") {
    return (
      <Alert color="danger" variant="solid">
        {"Desolé,Vous n'avez pas accès sur cette page"}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="p-3">
          <div className="flex justify-between items-center p-3">
            <h1 className="text-2xl font-bold">Paramètres</h1>
            <span className="text-danger text-sm">
              Login : {profil?.email}, Role:{profil.role}
            </span>
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Options" color="primary">
        <Tab
          key="profil"
          title={
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Utilisateurs</span>
            </div>
          }
        >
          <Utilisateur profil={profil} />
        </Tab>    
        <Tab key={"camion"} title="Camion">
          <Camion />
          </Tab>   
        <Tab key={"marchandise"} title="Marchandise">
          <Marchandise />
          </Tab>   
        <Tab key={"journal"} title="Journal">
          <Journal />
          </Tab>   
      </Tabs>
      <div>
        <ModalWithForm
          action="POST"
          endPoint="succursales"
          isOpened={modalAdd}
          titre={"Ajout succursale"}
        >
          <>
            <Input
              color="primary"
              isRequired={true}
              label="Code Succussale"
              labelPlacement="outside"
              name="code"
            />
            <Input
              color="primary"
              isRequired={true}
              label="Nom succussale"
              labelPlacement="outside"
              name="nom"
            />
            <Input
              color="primary"
              label="Adresse Succussale"
              labelPlacement="outside"
              name="adresse"
            />
            <div className="flex justify-between gap-3">
              <Input
                color="primary"
                label="Téléphone"
                labelPlacement="outside"
                name="telephone"
              />
              <Input
                color="primary"
                label="E-mail"
                labelPlacement="outside"
                name="email"
              />
            </div>
          </>
        </ModalWithForm>
      </div>

      <ModalAntReusable
        isOpened={modalAntAdd}
        titre="dsjkdskd"
        onOk={handleOkAnt}
      >
        <div>Suppression okkkk</div>
      </ModalAntReusable>
    </div>
  );
}
