"use client"
import LayoutSecond from "@/layouts/LayoutSecond";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/react";
import React from "react";
import Navbar  from "./components/Navbar";

const layout = ({ children }: { children: any }) => {
  return (
    <LayoutSecond titre={"Facturation Import"}>
      <div>
        <Navbar />
        <Card className="mt-5 pt-3">
            <CardBody>
                {children}
            </CardBody>    
        </Card>
      </div>
    </LayoutSecond>
  );
};

export default layout;
