"use client";
import clsx from "clsx";
import DashboardNav from "../nav/dashboard-nav";
import { usePathname } from "next/navigation";

type SideContainerProps = {
  children: React.ReactNode;
};

export default function SideContainer({ children }: SideContainerProps) {
  const path = usePathname();

  return (
    <div
      className={clsx(
        "relative mx-auto px-1 sm:px-3 pt-3 pb-20 w-full",
        path.includes("/admin/real-state/export/") ? "max-w-5xl" : "max-w-3xl",
      )}
    >
      <DashboardNav />
      <div className="px-1 sm:px-2 md:px-8">{children}</div>
    </div>
  );
}
