"use client";
import React, { useState } from "react";
import { siteConfig } from "@/lib/sites";
import Link from "next/link";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { formatPath } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import usePanel from "@/stores/usePanel";
import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "../ui/spinner";

export default function Sidebar() {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const state = usePanel.use.state();
  const router = useRouter();

  async function logout() {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/account/admin/login");
        },
      },
    });
    setIsLoading(false);
  }

  return (
    <div
      className={clsx(
        "group hidden md:block top-0 sticky shadow-slate-400/30 shadow-sm p-3 h-dvh overflow-x-hidden transition-all duration-300 ease-in-out",
        state ? "w-[68px]" : "w-[200px]",
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-y-6">
          <Link
            href="/"
            className={clsx(
              rubik.className,
              "gap-x-1 inline-flex items-center transition-all duration-300 ease-in-out w-full",
            )}
          >
            <div
              className={clsx(
                "flex justify-center items-center rounded-sm min-w-[44px] min-h-[44px] text-(--light) text-sm",
                rubik.className,
              )}
            >
              <Image
                src="/SMLogo.png"
                alt="Logo"
                width={44}
                height={44}
                className="w-full h-full object-center object-contain"
              />
            </div>
            <h2
              className={clsx(
                "-top-[6px] -left-1 relative overflow-hidden font-semibold text-[26px] transition-all duration-300 ease-in-out",
                state ? "w-0" : "w-[135px]",
                rubik.className,
              )}
            >
              SIDE
            </h2>
          </Link>
          <div className="space-y-2">
            <h2
              className={clsx(
                "flex h-6 text-neutral-500 uppercase",
                rubik.className,
              )}
            >
              <span
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  state ? "invisible w-0" : "visible w-[176px]",
                )}
              >
                Menu
              </span>
            </h2>
            <ul className="space-y-2">
              {siteConfig.sidemenu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.url}
                    className={clsx(
                      rubik.className,
                      "text-neutral-600 gap-x-1  py-2 px-3 inline-flex items-center transition-all duration-300 ease-in-out text-sm rounded-sm w-full hover:bg-(--bright-green)/10",
                      formatPath(path).startsWith(menu.url) &&
                        "!bg-(--bright-green) !text-(--light)",
                    )}
                  >
                    <span className="flex justify-center items-center min-w-5 min-h-5">
                      {<menu.icon size={18} />}{" "}
                    </span>
                    <span
                      className={clsx(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        state ? "w-0" : "w-[135px]",
                      )}
                    >
                      {menu.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button
          variant="destructive"
          className={clsx(
            rubik.className,
            "inline-flex px-3 justify-start transition-all duration-300 ease-in-out w-full",
          )}
          onClick={logout}
        >
          {!isLoading && (
            <>
              <span className="flex justify-center items-center min-w-[18px] min-h-[18px]">
                <LogOutIcon size={18} />
              </span>
              <span
                className={clsx(
                  "overflow-hidden text-left transition-all duration-300 ease-in-out",
                  state ? "w-0" : "w-[135px]",
                )}
              >
                Deconnexion
              </span>
            </>
          )}
          {isLoading && (
            <span className="flex justify-center w-full">
              <Spinner size="small" className="text-(--light)" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
