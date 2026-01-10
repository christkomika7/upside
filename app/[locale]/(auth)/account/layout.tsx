import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (data?.session) {
    return redirect("/admin/real-state");
  }

  return <div>{children}</div>;
}
