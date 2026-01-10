import SideContainer from "@/components/sidebar/side-container";
import Sidebar from "@/components/sidebar/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.session) {
    return redirect("/account/admin/login");
  }
  return (
    <div className="relative flex bg-(--light) min-h-dvh">
      <Sidebar />
      <SideContainer>{children}</SideContainer>
    </div>
  );
}
