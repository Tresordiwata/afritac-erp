export type IClient = {
    id: string;
    nom_client: string;
    code: string;
    num_nif: string;
    adresse?: string;
    telephone: string;
    email: string;
    rccm:string;
    idNat:string;
    isFacturedForImport?: boolean;
    isFacturedForExport?: boolean;
    isFacturedForTva?: boolean;
    lastPrintedDeclation?: Date | null;
    enabled? : string
  }