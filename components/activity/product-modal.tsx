"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
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
import HouseCardLoader from "../house-card-loader";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { unique } from "@/actions/realstate";
import { RealStateType } from "@/lib/type";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import CopyButton from "../copy-button";
import { usePathname } from "next/navigation";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "../ui/modal";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import useImage from "@/stores/useImage";
import ViewImage from "../view-image";
import FeatureBadgeList from "./feature-badge-list";
import MobileCopyButton from "../mobile-copy-button";
import { useIsMobile } from "@/hooks/useIsMobile";
import clsx from "clsx";
import { inter } from "@/font/font";

type ProductModalProps = {
  children: React.ReactNode;
  id: string;
};

export default function ProductModal({ children, id }: ProductModalProps) {
  const locale = useCurrentLocale();
  const [open, setOpen] = useState(false);
  const setShow = useImage.use.setShow();
  const pathname = usePathname();
  const tm = useScopedI18n("toast");
  const ta = useScopedI18n("action");
  const isMobile = useIsMobile();

  const query: UseQueryResult<{ data: RealStateType }, Error> = useQuery({
    queryKey: ["house", id],
    queryFn: () => unique({ id }),
  });

  useEffect(() => {
    if (!open) setShow(false);
  }, [open]);

  return (
    <>
      <ResponsiveModal open={open} onOpenChange={(e) => setOpen(e)}>
        <ResponsiveModalTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </ResponsiveModalTrigger>
        <ResponsiveModalContent
          hasIcon={false}
          className="!gap-0 !space-y-0 grid grid-cols-1 bg-transparent !shadow-none px-0 sm:px-2 py-2 !border-none focus-within:border-none rounded-none outline-0 focus-within:ring-0 !w-full !max-w-[1146px] !h-svh max-h-svh scrollbar-hide"
        >
          <div className="relative flex flex-col rounded-b-none sm:rounded-b-[32px] h-full scrollbar-hide">
            <div className="hidden sm:flex flex-col items-end w-full h-11">
              <Button
                onClick={() => setOpen(false)}
                variant="close"
                className="bg-white !px-1 border-none h-9"
              >
                <XIcon size={15} /> {ta("close")}
              </Button>
            </div>
            <div className="flex-1 bg-(--light) shadow-neutral-400/30 rounded-t-[32px] rounded-b-none sm:rounded-b-[32px] w-full max-w-full overflow-hidden">
              <ResponsiveModalTitle />
              <ResponsiveModalDescription />
              <ViewImage rounded="sm" />
              <div className="sm:hidden flex flex-col justify-end items-center w-full h-11">
                <Button
                  onClick={() => setOpen(false)}
                  variant="close"
                  className="bg-white !px-1 border-none h-9"
                >
                  <XIcon size={15} /> {ta("close")}
                </Button>
              </div>

              {query.isLoading && <HouseCardLoader />}

              {!query.isLoading && query.data && (
                <div className="mt-2 w-full">
                  <div className="relative pt-2.5 w-full h-[280px] sm:h-[300px]">
                    <ActivitiesModalSlider images={query.data.data.images} />
                  </div>
                  <div className="space-y-1.5 bg-(--light) p-4 md:p-7">
                    <h2 className="font-semibold text-(--deep-dark) text-base md:text-xl lg:text-2xl">
                      {query.data.data.title}
                    </h2>
                    <pre
                      className={clsx(
                        "text-sm break-words whitespace-pre-wrap",
                        inter.className
                      )}
                    >
                      {locale === "fr"
                        ? query.data.data.description
                        : query.data.data.translate}
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
                        <Badge
                          variant="address"
                          className="w-full sm:w-fit h-[40px]"
                        >
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
                            message={tm("phone.success")}
                            error={tm("phone.error")}
                            value={query.data.data.phone}
                          >
                            <PhoneIcon className="fill-(--dark-turquoise)" />
                          </CopyButton>
                        </li>
                      )}
                      {query.data.data.email && (
                        <li className="flex w-5 h-5">
                          <CopyButton
                            message={tm("email.success")}
                            error={tm("email.error")}
                            value={query.data.data.email}
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
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
