import { NextRequest } from "next/server";
import PageClient from "./PageClient";

export default async function Home(Req:NextRequest) {
  
  return <PageClient />;
}
