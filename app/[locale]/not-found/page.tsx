"use client";
import Logo from "@/components/logo";
import { useScopedI18n } from "@/locales/client";
import { CompassIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  const t = useScopedI18n("notfound");
  return (
    <div className="bg-(--light) p-6 w-screen h-screen">
      <div className="flex mx-auto w-full max-w-4xl h-full">
        <div className="h-12">
          <Logo />
        </div>
        <div className="flex flex-col flex-1 justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center gap-x-2 space-y-1 mb-3 text-neutral-700">
            <span>
              <CompassIcon size={45} />
            </span>
            <h2 className="font-bold text-sm text-center uppercase">
              {t("error")}
            </h2>
          </div>
          <p className="mb-1.5 text-neutral-700 text-sm text-center">
            {t("title")}
            <br />
            {t("description")}
          </p>
          <p className="text-neutral-600 text-sm text-center">
            <Link href="/" className="font-medium underline">
              {t("link")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
