"use client"
import LayoutSecond from "@/layouts/LayoutSecond";
import React from "react";
import Navbar from "./Navbar";
import { Card, CardBody } from "@heroui/react";

const Content_facture_import = ({ children }: { children: any }) => {
  return (
    <LayoutSecond titre={"Facturation import"}>
      <div>
        <Navbar />
        <Card className="mt-4">
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </LayoutSecond>
  );
};

export default Content_facture_import;
