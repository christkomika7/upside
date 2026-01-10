"use client";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { ChevronDownIcon, MenuIcon, PanelLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardMobileMenu from "./dashboard-mobile-menu";
import usePanel from "@/stores/usePanel";
import SidebarSheet from "../sidebar/sidebar-sheet";
import { authClient } from "@/lib/auth-client";
import { UserType } from "@/lib/type";
import { Skeleton } from "../ui/skeleton";
import { initialName, limiteName } from "../../lib/utils";

export default function DashboardNav() {
  const toggle = usePanel.use.toggle();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  async function getUser() {
    const data = await authClient.getSession();
    if (data.data?.user) {
      setUser(data.data.user);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="top-0 z-[2000] sticky pt-2 w-full">
      <nav className="flex justify-between items-center bg-white/40 shadow-slate-400/30 shadow-xs backdrop-blur-xl p-2.5 rounded-full">
        <span className="hidden md:inline ml-4 cursor-pointer" onClick={toggle}>
          <PanelLeftIcon size={15} />
        </span>
        <SidebarSheet>
          <span className="md:hidden inline cursor-pointer">
            <PanelLeftIcon size={15} />
          </span>
        </SidebarSheet>
        <DashboardMobileMenu top={18}>
          <div className="flex items-center gap-x-2 bg-(--bright-green)/5 p-2 rounded-full cursor-pointer">
            {isLoading && (
              <>
                <Skeleton className="bg-neutral-200 rounded-full w-[36px] h-[36px]" />
                <div className="space-y-1">
                  <Skeleton className="bg-neutral-200 rounded-full w-[90px] h-3" />
                  <Skeleton className="bg-neutral-200 rounded-full w-[75px] h-2" />
                </div>
                <Skeleton className="bg-neutral-200 pr-2 rounded-full w-[15px] h-[15px]" />
              </>
            )}
            {!isLoading && user && (
              <>
                <div className="flex justify-center items-center bg-(--bright-green) rounded-full w-9 h-9 font-bold text-(--light) text-sm uppercase">
                  {initialName(user.name)}
                </div>
                <div className="-space-y-1">
                  <h2
                    className={clsx(
                      "font-semibold text-neutral-600 text-sm",
                      rubik.className
                    )}
                  >
                    {limiteName(user.name, 12)}
                  </h2>
                  <p
                    className={clsx(
                      "font-medium text-neutral-500 text-xs",
                      rubik.className
                    )}
                  >
                    @Admin
                  </p>
                </div>
                <span className="pr-2">
                  <ChevronDownIcon size={15} />
                </span>
              </>
            )}
          </div>
        </DashboardMobileMenu>
      </nav>
    </div>
  );
}
