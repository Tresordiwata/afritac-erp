"use client";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftFromLine,
  ArrowRightFromLineIcon,
  FastForward,
  ListCheckIcon,
  PlusIcon,
} from "lucide-react";

import Detail from "./Detail";

import LayoutSecond from "@/layouts/LayoutSecond";
import { getJournalTypes } from "@/services/journal";

const PageClient = () => {
  const journalTypes = useQuery({
    queryKey: ["jrn"],
    queryFn: getJournalTypes,
  }).data;

  useEffect(() => {
    // setModalOpened(!modalOpened);
  }, []);

  return (
    <LayoutSecond titre={"Facturation"}>
      <>
        <Card>
          <CardHeader className="">
            <div className="flex justify-between w-full">
              <div className="flex gap-3">
                <Link href={"/facturation/frais-supplementaire"}>
                  <Button color="success" startContent={<PlusIcon size={15} />}>
                    Frais suppl.
                  </Button>
                </Link>
                <Link href={"#"}>
                  <Button color="primary" startContent={<ArrowLeftFromLine />}>
                    Facturer import
                  </Button>
                </Link>
                <Link href={"#"}>
                  <Button
                    color="primary"
                    startContent={<ArrowRightFromLineIcon />}
                  >
                    Facturer export
                  </Button>
                </Link>
                <Link href={"/facturation-liste"}>
                  <Button
                    color="primary"
                    startContent={<ListCheckIcon size={15} />}
                  >
                    Liste factures
                  </Button>
                </Link>
              </div>
              <Link href={"/saisie-rapide"}>
                <Button color="danger" variant="solid" startContent={<FastForward size={15} />}>
                  Saisie rapide
                </Button>
              </Link>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex gap-3 w-full flex-wrap">
              {journalTypes?.map((journalType, i) => (
                <Detail key={i} props={journalType} />
              ))}
            </div>
          </CardBody>
        </Card>
      </>
    </LayoutSecond>
  );
};

export default PageClient;
