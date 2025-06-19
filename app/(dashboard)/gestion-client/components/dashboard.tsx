"use client";

import { useInvoiceStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, BanknoteIcon, FileIcon, TrendingUpIcon } from "lucide-react";

export function Dashboard() {
  const invoices = useInvoiceStore((state:any) => state.invoices);
  
  const totalAmount = invoices
    .filter(i => !i.archived)
    .reduce((sum:any, invoice:any) => sum + invoice.montant, 0);
  
  const activeInvoices = invoices.filter(i => !i.archived).length;
  const archivedInvoices = invoices.filter(i => i.archived).length;
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Factures</CardTitle>
          <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAmount.toFixed(2)} €</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Factures Actives</CardTitle>
          <FileIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeInvoices}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Archives</CardTitle>
          <Archive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{archivedInvoices}</div>
        </CardContent>
      </Card>
    </div>
  );
}