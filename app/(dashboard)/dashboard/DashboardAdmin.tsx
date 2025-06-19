"use client";

import { Card, CardBody, CardHeader, Select, SelectItem } from "@heroui/react";
import {
  TrendingDown,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/lib/store/authStore";
// import { IDashboard } from "@/lib/types/dashboard";
// import { getDashboard } from "@/services/dashboard";


export default function DashboardPageAdmin() {
  // const [dashboardData, setDashboardData] = useState<IDashboard | undefined>();
  const [nonCloture, setNonCloture] = useState(0);
  const utilisateur = useAuthStore((state) => state.utilisateur);

  useEffect(() => {
   
  }, []);

  // const { data: stats, isLoading: statsLoading } = useQuery<IDashboard>({
  //   queryKey: ['succursale-stats', utilisateur?.succursaleId],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/dashboard/succursale/${utilisateur?.succursaleId}/stats`);
  //     if (!response.ok) {
  //       throw new Error('Erreur lors du chargement des statistiques');
  //     }
  //     return response.json();
  //   },
  //   enabled: !!utilisateur?.succursaleId,
  // });

  // const { data: activites, isLoading: activitesLoading } = useQuery<
  //   ActiviteRecente[]
  // >({
  //   queryKey: ["activites-recentes", utilisateur?.succursaleId],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `/api/dashboard/succursale/${utilisateur?.succursaleId}/activites`,
  //     );

  //     if (!response.ok) {
  //       throw new Error("Erreur lors du chargement des activités");
  //     }

  //     return response.json();
  //   },
  //   enabled: !!utilisateur?.succursaleId,
  // });

  //   if (statsLoading || activitesLoading) {
  //     return (
  //       <div className="h-full flex items-center justify-center">
  //         <Spinner size="lg" />
  //       </div>
  //     );
  //   }

  return (
    <div className="space-y-8">
      <div className="flex flex-row justify-between">
        <div className="w-2/3">
          <h1 className="text-2xl font-bold mb-2">
            Bienvenue, {utilisateur?.prenom} {utilisateur?.nom}
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de la situation financière de votre succursale
          </p>
        </div>
        <div className="w-1/3">
          <Select fullWidth={true} name="periode" id="periode" label="Periode dashboard" labelPlacement="outside-left">
            <SelectItem key={"M"}>{"Mensuel"}</SelectItem>
            <SelectItem key={"Journalier"}>{"Journalier"}</SelectItem>
            <SelectItem key={"A"}>{"Annuel"}</SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Entrées</p>
              <p className="text-xl font-bold text-success">
                0
          
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Entrées</p>
              <p className="text-xl font-bold text-success">
                0
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <TrendingDown className="w-6 h-6 text-danger" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Dépenses</p>
              <p className="text-xl font-bold text-danger">
                0
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <TrendingDown className="w-6 h-6 text-danger" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Dépenses</p>
              <p className="text-xl font-bold text-danger">
                0
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-success/10">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Solde</p>
              <p
                className={`text-xl font-bold ${0 >= 0 ? "text-success" : "text-danger"}`}
              >
                0
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-success/10">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Solde</p>
              <p
                className={`text-xl font-bold ${0 >= 0 ? "text-success" : "text-danger"}`}
              >
                0
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-warning/10">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Non Clôturées</p>
              <p className="text-xl font-bold">{nonCloture || 0}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Activités Récentes</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div
                key={1}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium" />
                    <p className="text-sm text-gray-500" />
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium`}>
                    0
                  </p>
                  <p className="text-sm text-gray-500" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">
              Informations Complémentaires
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Utilisateurs Actifs</span>
                </div>
                <span className="font-bold">{""}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Dépenses Planifiées</span>
                </div>
                <span className="font-bold text-warning">
                  0
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Opérations du Jour</span>
                </div>
                <span className="font-bold">{""}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
