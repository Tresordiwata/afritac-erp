"use client";

import { useInvoiceStore } from "@/lib/store/invoice";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Archive, BanknoteIcon, FileIcon, TrendingUpIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDashboardData } from "@/services/getData";

export function Dashboard() {
  const invoices = useInvoiceStore((state) => state.invoices);
  
  const totalAmount = invoices
    .filter(i => !i.archived)
    .reduce((sum, invoice) => sum + invoice.montant, 0);
  
  const activeInvoices = invoices.filter(i => !i.archived).length;
  const archivedInvoices = invoices.filter(i => i.archived).length;

  const dashboardData=useQuery({queryKey:["dashbordData"],queryFn:getDashboardData,refetchInterval:3000}).data 


  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium color-primary">Total Factures</div>
          <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{dashboardData?.all?.reduce((i:any,acc:any)=>{return acc?.montant+i},0).toFixed(2)} €</div>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium color-primary">Factures Actives</div>
          <FileIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{dashboardData?.not_archiveds?.length}</div>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium color-primary">Archives</div>
          <Archive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <Link href={"/gestion-paiement/archives"}><div className="text-2xl font-bold">{dashboardData?.archiveds?.length}</div></Link>
        </CardBody>
      </Card>
    </div>
  );
}