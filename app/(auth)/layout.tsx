import { cookies } from "next/headers";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const c = await cookies();
  
  // c.get("connected") && redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-300 bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      {children}
    </div>
  );
}