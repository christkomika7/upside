"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { rubik } from "@/font/font";
import { siteConfig } from "@/lib/sites";
import { formatPath } from "@/utils/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type SidebarSheetProps = {
  children: React.ReactNode;
};

export default function SidebarSheet({ children }: SidebarSheetProps) {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
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
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between p-4 h-full">
          <div className="flex flex-col gap-y-6">
            <div
              className={clsx(
                rubik.className,
                "gap-x-1 inline-flex items-center transition-all duration-300 ease-in-out w-full"
              )}
            >
              <div
                className={clsx(
                  "flex justify-center items-center rounded-sm min-w-[44px] min-h-[44px] text-(--light) text-sm",
                  rubik.className
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
                  rubik.className
                )}
              >
                SIDE
              </h2>
            </div>
            <div className="space-y-2">
              <h2
                className={clsx(
                  "flex h-6 text-neutral-500 uppercase",
                  rubik.className
                )}
              >
                <span
                  className={clsx(
                    "overflow-hidden transition-all duration-300 ease-in-out"
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
                          "!bg-(--bright-green) !text-(--light)"
                      )}
                    >
                      <span className="flex justify-center items-center min-w-5 min-h-5">
                        {<menu.icon size={18} />}{" "}
                      </span>
                      <span
                        className={clsx(
                          "overflow-hidden transition-all duration-300 ease-in-out"
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
            onClick={logout}
            variant="destructive"
            className={clsx(
              rubik.className,
              "gap-x-1 inline-flex justify-start transition-all duration-300 ease-in-out w-full"
            )}
          >
            {!isLoading && (
              <>
                <span className="flex justify-center items-center min-w-5 min-h-5">
                  <LogOutIcon size={18} />
                </span>
                <span
                  className={clsx(
                    "overflow-hidden text-left transition-all duration-300 ease-in-out"
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
      </SheetContent>
    </Sheet>
  );
}
