"use client";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { ArrowLeft, Grip } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LayoutSecond = ({
  titre = "",
  children,
  backable
}: {
  titre?: String | React.JSX.Element;
  children: React.JSX.Element;
  backable?:boolean
}) => {
  const router=useRouter()
  return (
    <div className="flex flex-col gap-10">
      <Card>
        <CardBody className="text-primary-50 border-gray-700 flex items-center flex-row gap-3 w-full">
          {
            backable ? <Button size="sm" onPress={()=>router.back()} isIconOnly><ArrowLeft size={13} /></Button>:<Grip />
          }
          <div className="bg-green-100 text-primary text-lg font-bold flex flex-gap items-center gap-4">{titre}</div>
        </CardBody>
      </Card>
      <Card className="mt-8">
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
};

export default LayoutSecond;
