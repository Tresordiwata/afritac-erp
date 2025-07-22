export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AFRITAC-ERP :: ERP AFRITAC SOLUTION",
  description: "Application ERP pour AFRITAC SARL",
  navItems: [
    {
      label: "Facturation",
      // href: "/facturation-import",
      href: "/facturation",
    },
    {
      label: "Paiement",
      href: "/gestion-paiement",
    },
    {
      label: "Client",
      href: "/gestion-client",
    },
    {
      label: "Facturation TVA",
      href: "/finance",
    },
    {
      label: "Reports",
      href: "/reporting",
    },
    {
      label: "Parametres",
      href: "/parametres",
    }
  ],
  navMenuItems: [
    {
      label: "Tableau de Bord",
      href: "/dashbord",
    },
    {
      label: "Depense",
      href: "/recette",
    },
    {
      label: "Recette",
      href: "/entrees",
    },
    {
      label: "Finance",
      href: "/entrees",
    },
    {
      label: "Reports",
      href: "/reporting",
    },
    {
      label: "Parametres",
      href: "/parametre",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "#",
    twitter: "#",
    docs: "#",
    discord: "#",
    sponsor: "#",
  },
};
