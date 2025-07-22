import React from "react";

import PageClient from "./PageClient";

import { IClient } from "@/lib/types/client";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams?: { id?: string } | any;
}
async function page({ searchParams }: Props) {
  const url = await searchParams?.id;
  const data = await prisma.client.findFirst({
    where: {
      id: url,
    },
  });
  const client: IClient | any = data;

  return <PageClient client={client} />;
}

export default page;
