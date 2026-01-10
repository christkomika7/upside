"use client";
import { Badge } from "../ui/badge";
import ActivitiesModalSlider from "../caroussel/activities-modal-slider";
import {
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ShareIcon,
  WhatsappIcon,
  SizeIcon,
} from "../ui/icon";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { unique } from "@/actions/realstate";
import { RealStateType } from "@/lib/type";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import CopyButton from "../copy-button";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";
import HouseCardLoader2 from "../house-card-loader2";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import FeatureBadgeList from "./feature-badge-list";
import MobileCopyButton from "../mobile-copy-button";
import { useIsMobile } from "@/hooks/useIsMobile";
import clsx from "clsx";
import { inter } from "@/font/font";

type InfoProductProps = {
  ref: RefObject<HTMLDivElement | null>;
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function InfoProduct({
  setIsLoading,
  id,
  ref,
}: InfoProductProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const t = useScopedI18n("product");
  const tm = useScopedI18n("toast");

  const query: UseQueryResult<{ data: RealStateType }, Error> = useQuery({
    queryKey: ["house", id],
    queryFn: () => unique({ id }),
  });

  useEffect(() => {
    setIsLoading(query.isLoading);
  }, [query.isLoading]);
  return (
    <div className="relative bg-(--light)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-8 font-semibold text-(--deep-dark) text-[30px] sm:text-[44px] text-center">
          {t("info")}
        </h2>
        {query.isLoading && <HouseCardLoader2 />}

        {!query.isLoading && query.data && (
          <div className="bg-(--light)" ref={ref}>
            <div className="relative pt-2.5 w-full h-[270px] md:h-[328px]">
              <ActivitiesModalSlider images={query.data.data.images} />
            </div>
            <div className="space-y-1.5 py-4 md:py-9">
              <h2 className="font-semibold text-(--deep-dark) text-base md:text-xl lg:text-2xl">
                {query.data.data.title}
              </h2>
              <pre
                className={clsx(
                  "text-sm break-words whitespace-pre-wrap",
                  inter.className
                )}
              >
                {query.data.data.description}
              </pre>
              <div className="flex md:flex-row flex-col justify-start md:justify-between items-start md:items-center gap-2">
                <div className="flex items-center gap-x-2">
                  {query.data.data.price &&
                  Number(query.data.data.price) > 0 ? (
                    <p className="font-semibold text-(--deep-dark) text-base md:text-xl lg:text-2xl">
                      {query.data.data.price
                        ? formatPrice(Number(query.data.data.price))
                        : "???"}
                      <sup> xaf</sup>{" "}
                    </p>
                  ) : null}
                  {query.data.data.dimension && (
                    <p className="flex items-center gap-x-1.5 text-(--deep-dark) text-sm">
                      <span className="flex w-5 h-5 text-(--dark-turquoise)">
                        <SizeIcon className="fill-(dark-turquoise)" />
                      </span>
                      {query.data.data.dimension}
                    </p>
                  )}
                </div>
                <div className="sm:flex items-center gap-x-2 grid grid-cols-[1fr_40px] w-full sm:w-fit">
                  <Badge variant="address" className="w-full sm:w-fit h-[40px]">
                    <span className="flex w-3 h-3">
                      <MapPinIcon className="fill-neutral-700" />
                    </span>
                    {query.data.data.city}, {query.data.data.area}
                  </Badge>
                  <div className="rounded-full w-[35px] h-[35px]">
                    <Link
                      href={`https://www.google.com/maps?q=${query.data.data.position[0]},${query.data.data.position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapIcon />
                    </Link>
                  </div>
                </div>
              </div>
              <FeatureBadgeList
                data={query.data.data}
                options={query.data.data.options}
              />
              <ul className="flex justify-end items-center gap-x-3 pt-2 text-(--dark-turquoise)">
                {query.data.data.phone && (
                  <li className="flex w-5 h-5">
                    <CopyButton
                      value={query.data.data.phone}
                      message={tm("phone.success")}
                      error={tm("phone.error")}
                    >
                      <PhoneIcon className="fill-(--dark-turquoise)" />
                    </CopyButton>
                  </li>
                )}
                {query.data.data.email && (
                  <li className="flex w-5 h-5">
                    <CopyButton
                      value={query.data.data.email}
                      message={tm("email.success")}
                      error={tm("email.error")}
                    >
                      <MailIcon className="fill-(--dark-turquoise)" />
                    </CopyButton>
                  </li>
                )}
                {query.data.data.whatsapp && (
                  <li className="flex w-5 h-5">
                    <Link
                      href={`https://wa.me/${query.data.data.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="fill-(--dark-turquoise)" />
                    </Link>
                  </li>
                )}
                <li className="flex w-5 h-5">
                  {isMobile && (
                    <MobileCopyButton
                      url={`${window.location.origin}${pathname}/${query.data.data.id}`}
                    >
                      <ShareIcon className="fill-(--dark-turquoise)" />
                    </MobileCopyButton>
                  )}
                  {!isMobile && (
                    <CopyButton
                      message={tm("share.success")}
                      error={tm("share.error")}
                      value={`${window.location.origin}${pathname}/${query.data.data.id}`}
                    >
                      <ShareIcon className="fill-(--dark-turquoise)" />
                    </CopyButton>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
