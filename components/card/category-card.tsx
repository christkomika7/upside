"use client";
import clsx from "clsx";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useScopedI18n } from "@/locales/client";
import { CategoryIdType } from "@/data";
import { Spinner } from "../ui/spinner";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createSerializer, parseAsInteger, parseAsString } from "nuqs";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  index: number;
  id: CategoryIdType;
  img: string;
  title: string;
  color?: "light" | "green";
  full?: true;
  section?: "categories" | "locations";
  values?: number[];
  isLoading?: boolean;
};

export default function CategoryCard({
  index,
  id,
  img,
  title,
  full,
  color = "light",
  section = "categories",
  values = [],
  isLoading,
}: CategoryCardProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const t = useScopedI18n(`${section}.cards`);
  const isMobile = useIsMobile();
  const router = useRouter();

  const serializer = useMemo(
    () =>
      createSerializer(
        {
          pageIndex: parseAsInteger.withDefault(1),
          pageSize: parseAsInteger.withDefault(CLIENT_TOTAL_PAGINATION_PAGE),
          property: parseAsString.withDefault(""),
        },
        {
          urlKeys: {
            pageIndex: "page",
            pageSize: "pageSize",
            property: "property",
          },
        }
      ),
    []
  );

  function goTo() {
    const url = serializer({
      pageIndex: 1,
      pageSize: CLIENT_TOTAL_PAGINATION_PAGE,
      property: title,
    });
    router.push(`/rent${url}`);
  }

  return (
    <div className={clsx("overflow-hidden", full ? "h-full" : "h-63.5")}>
      <div className="group relative rounded-4xl w-full h-full">
        <Image
          src={img}
          alt={title}
          width={400}
          height={300}
          priority
          unoptimized
          loading="eager"
          className="rounded-[32px] w-full h-full object-center object-cover overflow-hidden"
        />
        {isLoading && (
          <div className="top-2 left-4 absolute flex justify-center items-center bg-white p-2 rounded-full w-32 h-12">
            <Spinner className="w-4 h-4" />
          </div>
        )}
        {!isLoading && (
          <>
            {isMobile ? (
              <div className="top-0 left-0 absolute -space-y-1 bg-white m-4 px-6 py-2 rounded-full h-[60px]">
                <p ref={ref} className="w-fit font-medium text-lg">
                  {t(`${id}.title`)}
                </p>

                <p className="text-sm">
                  <>
                    {values.length === 0 && (
                      <>0 {t(`${id}.content.singular`)}</>
                    )}
                    {values.length === 6 && values[index] < 2 && (
                      <>
                        {values[index]} {t(`${id}.content.singular`)}
                      </>
                    )}
                    {values.length === 6 && values[index] > 1 && (
                      <>
                        {values[index]} {t(`${id}.content.plurial`)}
                      </>
                    )}
                  </>
                </p>
              </div>
            ) : (
              <div className="top-0 left-0 absolute -space-y-1 bg-white group-hover:bg-(--brown) m-4 px-6 py-2 rounded-full h-[44px] group-hover:h-[60px] transition-all duration-300 ease-in-out">
                <p
                  ref={ref}
                  className={clsx(
                    "font-medium text-lg transition-all duration-300 ease-in-out",
                    `w-fit`
                  )}
                >
                  {t(`${id}.title`)}
                </p>

                <p className="top-1 group-hover:top-0 relative opacity-0 group-hover:opacity-100 text-sm transition-all duration-300 ease-in-out">
                  <>
                    {values.length === 0 && (
                      <>0 {t(`${id}.content.singular`)}</>
                    )}
                    {values.length === 6 && values[index] < 2 && (
                      <>
                        {values[index]} {t(`${id}.content.singular`)}
                      </>
                    )}
                    {values.length === 6 && values[index] > 1 && (
                      <>
                        {values[index]} {t(`${id}.content.plurial`)}
                      </>
                    )}
                  </>
                </p>
              </div>
            )}
          </>
        )}

        {isMobile ? (
          <>
            <div
              className={clsx(
                "right-[70px] bottom-0 absolute bg-transparent shadow-[35px_0_0_0] rounded-br-[32px] w-[70px] h-[30px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>
            <div
              className={clsx(
                "right-0 bottom-[70px] absolute bg-transparent shadow-[35px_0_0_0] rounded-br-[32px] w-[70px] h-[30px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>
            <div
              className={clsx(
                "-right-[70px] bottom-0 absolute flex justify-center items-center bg-transparent shadow-[-70px_0_0_0] rounded-tl-[32px] w-[70px] h-[70px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>

            <Button
              variant="search"
              onClick={(e) => {
                e.preventDefault();
                goTo();
              }}
              className="right-[10px] bottom-[10px] absolute opacity-100 border-0 rounded-full w-12 h-12 transition-all duration-200"
            >
              <ArrowRightIcon />
            </Button>
          </>
        ) : (
          <>
            <div
              className={clsx(
                "right-[70px] bottom-0 absolute bg-transparent shadow-[0_0_0_0] group-hover:shadow-[35px_0_0_0] rounded-br-[32px] w-[70px] h-[30px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>
            <div
              className={clsx(
                "right-0 bottom-[70px] absolute bg-transparent shadow-[0_0_0_0] group-hover:shadow-[35px_0_0_0] rounded-br-[32px] w-[70px] h-[30px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>
            <div
              className={clsx(
                "-right-[70px] bottom-0 absolute flex justify-center items-center bg-transparent shadow-[0_0_0_0] group-hover:shadow-[-70px_0_0_0] rounded-tl-[32px] w-[70px] h-[70px]",
                color === "light" && "shadow-[#f8f7f5]",
                color === "green" && "shadow-[#2d3d39]"
              )}
            ></div>

            <Button
              variant="search"
              onClick={(e) => {
                e.preventDefault();
                goTo();
              }}
              className="right-0 group-hover:right-[10px] bottom-[10px] absolute opacity-0 group-hover:opacity-100 border-0 rounded-full w-12 h-12 transition-all duration-200"
            >
              <ArrowRightIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
