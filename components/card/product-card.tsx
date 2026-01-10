"use client";
import { Badge } from "../ui/badge";
import ActivitiesSlider from "../caroussel/activities-slider";
import { Button } from "../ui/button";
import ProductModal from "../activity/product-modal";
import {
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ShareIcon,
  WhatsappIcon,
  BedIcon,
  BathIcon,
  SizeIcon,
  RoomIcon,
} from "../ui/icon";
import { RealStateType, ViewType } from "@/lib/type";
import { formatPrice } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import v from "voca";
import Link from "next/link";
import CopyButton from "../copy-button";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileCopyButton from "../mobile-copy-button";
import clsx from "clsx";

type ProductCardProps = {
  house: RealStateType;
};

export default function ProductCard({ house }: ProductCardProps) {
  const t = useScopedI18n("product");
  const pathname = usePathname();
  const tm = useScopedI18n("toast");
  const isMobile = useIsMobile();

  return (
    <div className="shadow-neutral-400/15 shadow-xl rounded-[32px] overflow-hidden">
      <ProductModal id={house.id}>
        <div className="relative w-full h-[358px]">
          <div className="top-0 left-0 z-30 absolute p-3 w-full h-full pointer-events-none">
            <div className="flex justify-between items-center">
              {house.view && (
                <Button
                  variant="filter"
                  className="shadow-none cursor-default pointer-events-auto"
                >
                  {v.capitalize(
                    t(
                      `views.${house.view.toLowerCase().replaceAll(" ", "_") as ViewType}`
                    )
                  )}
                </Button>
              )}
              <Button
                variant="filter"
                className="shadow-none pointer-events-auto"
              >
                {v.capitalize(t("see"))}
              </Button>
            </div>
          </div>

          <ActivitiesSlider images={house.images} />
        </div>
      </ProductModal>

      <div className="bg-white shadow-neutral-400/30 shadow-xl px-3 py-7">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-(--deep-dark) text-xl lg:text-2xl">
            {house.title}
          </h2>

          <div className="hidden lg:block rounded-full w-[35px] h-[35px]">
            <Link
              href={`https://www.google.com/maps?q=${house.position[0]},${house.position[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapIcon />
            </Link>
          </div>
        </div>
        <div className={clsx("flex justify-between items-center mb-3")}>
          {house.price && Number(house.price) > 0 ? (
            <p className="font-semibold text-(--deep-dark) text-base md:text-xl lg:text-2xl">
              {house.price ? formatPrice(Number(house.price)) : "???"}
              <sup> xaf</sup>{" "}
            </p>
          ) : (
            <p className="font-semibold text-(--deep-dark)">N/A</p>
          )}

          <Badge variant="address" className="hidden lg:flex">
            <span className="flex w-3 h-3">
              <MapPinIcon className="fill-neutral-700" />
            </span>
            {house.city}, {house.area}
          </Badge>
        </div>

        <div className="flex justify-between items-center mb-3">
          <ul className="flex justify-between lg:justify-start items-center gap-x-2 w-full lg:w-fit">
            {house.dimension && (
              <li className="flex items-center gap-x-1.5 text-(--deep-dark) text-sm">
                <span className="flex w-5 h-5">
                  <SizeIcon className="fill-(--dark-turquoise)" />
                </span>
                {house.dimension}
              </li>
            )}
            {house.bathroom && Number(house.bathroom) > 0 ? (
              <li className="flex items-center gap-x-1 text-(--deep-dark) text-sm">
                <span className="flex w-5 h-5">
                  <BathIcon className="fill-(--dark-turquoise)" />
                </span>
                {Number(house.bathroom) === 6 ? "+5" : house.bathroom}{" "}
                <span>
                  {t("bathroom")}
                  {Number(house.bathroom) > 1 && "s"}
                </span>
              </li>
            ) : (
              ""
            )}
            {house.bedroom && Number(house.bedroom) > 0 ? (
              <li className="flex items-center gap-x-1 text-(--deep-dark) text-sm">
                <span className="flex w-5 h-5">
                  <BedIcon className="fill-(--dark-turquoise)" />
                </span>
                {Number(house.bedroom) === 6 ? "+5" : house.bedroom}{" "}
                <span>
                  {t("bedroom")}
                  {Number(house.bedroom) > 1 && "s"}
                </span>
              </li>
            ) : (
              ""
            )}
            {house.room && Number(house.room) > 0 ? (
              <li className="flex items-center gap-x-1 text-(--deep-dark) text-sm">
                <span className="flex w-5 h-5">
                  <RoomIcon className="fill-(--dark-turquoise)" />
                </span>
                {Number(house.room) === 6 ? "+5" : house.room}{" "}
                <span>
                  {t("room")}
                  {Number(house.room) > 1 && "s"}
                </span>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="hidden lg:flex items-center gap-x-4 text-(--dark-turquoise) text-sm">
            {house.phone && (
              <li className="flex w-5 h-5">
                <CopyButton
                  message={tm("phone.success")}
                  error={tm("phone.error")}
                  value={house.phone}
                >
                  <PhoneIcon className="fill-(--dark-turquoise)" />
                </CopyButton>
              </li>
            )}
            {house.email && (
              <li className="z-40 relative flex w-5 h-5">
                <CopyButton
                  message={tm("email.success")}
                  error={tm("email.error")}
                  value={house.email}
                >
                  <MailIcon className="fill-(--dark-turquoise)" />
                </CopyButton>
              </li>
            )}
            {house.whatsapp && (
              <li className="flex w-5 h-5">
                <Link
                  href={`https://wa.me/${house.whatsapp}`}
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
                  url={`${window.location.origin}${pathname}/${house.id}`}
                >
                  <ShareIcon className="fill-(--dark-turquoise)" />
                </MobileCopyButton>
              )}
              {!isMobile && (
                <CopyButton
                  message={tm("share.success")}
                  error={tm("share.error")}
                  value={`${window.location.origin}${pathname}/${house.id}`}
                >
                  <ShareIcon className="fill-(--dark-turquoise)" />
                </CopyButton>
              )}
            </li>
          </ul>
        </div>
        <div className="lg:hidden justify-between items-center gap-x-2 grid grid-cols-[1fr_40px] mb-3 pb-2">
          <Badge variant="address" className="hidden lg:flex">
            <span className="flex w-3 h-3">
              <MapPinIcon className="fill-neutral-700" />
            </span>
            {house.city}, {house.area}
          </Badge>
          <div className="hidden lg:block rounded-full w-[35px] h-[35px]">
            <Link
              href={`https://www.google.com/maps?q=${house.position[0]},${house.position[1]} (${encodeURIComponent(house.title)})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapIcon />
            </Link>
          </div>
        </div>
        <ul className="lg:hidden flex justify-between items-center gap-x-3 w-full text-(--dark-turquoise) text-sm">
          {house.phone && (
            <li className="flex w-5 h-5">
              <CopyButton
                message={tm("phone.success")}
                error={tm("phone.error")}
                value={house.phone}
              >
                <PhoneIcon className="fill-(--dark-turquoise)" />
              </CopyButton>
            </li>
          )}
          {house.email && (
            <li className="flex w-5 h-5">
              <CopyButton
                message={tm("email.success")}
                error={tm("email.error")}
                value={house.email}
              >
                <MailIcon className="fill-(--dark-turquoise)" />
              </CopyButton>
            </li>
          )}
          {house.whatsapp && (
            <li className="flex w-5 h-5">
              <Link
                href={`https://wa.me/${house.whatsapp}`}
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
                url={`${window.location.origin}${pathname}/${house.id}`}
              >
                <ShareIcon className="fill-(--dark-turquoise)" />
              </MobileCopyButton>
            )}
            {!isMobile && (
              <CopyButton
                message={tm("share.success")}
                error={tm("share.error")}
                value={`${window.location.origin}${pathname}/${house.id}`}
              >
                <ShareIcon className="fill-(--dark-turquoise)" />
              </CopyButton>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
