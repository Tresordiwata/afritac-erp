"use client";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import LayoutSecond from "@/layouts/LayoutSecond";
import { getJournalTypes } from "@/services/journal";
import { LinkIcon, Plus } from "lucide-react";

const PageClient = () => {
  const journalTypes = useQuery({
    queryKey: ["jrn"],
    queryFn: getJournalTypes,
  }).data;

  return (
    <LayoutSecond titre={"Facturation"}>
      <Card>
        <CardHeader className="">
          <div className="flex gap-3">
            <Link href={"#"}>
              <Button color="primary">Facturer import</Button>
            </Link>
            <Link href={"#"}>
              <Button color="primary">Facturer export</Button>
            </Link>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex gap-3">
            {journalTypes?.map((journalType, i) => (
              <Card key={i} className="min-w-[300] light:bg-slate-300">
                <CardHeader className="text-primary font-bold">{journalType.libelle}</CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex gap-2 items-center justify-start">
                    Solde : {journalType?.solde} <LinkIcon size={12} />
                  </div>
                  <div className="flex gap-2 items-center justify-start">
                    Date dern. impr : {""} <LinkIcon size={12} />
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="text-sm text-blue-300">
                    <Link className="flex items-center gap-2" href={"#"} onClick={()=>alert("ok")}>
                    <Plus size={12} />
                    Nouveau paiement</Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </LayoutSecond>
  );
};

export default PageClient;
