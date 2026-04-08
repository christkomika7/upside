"use client";
import clsx from "clsx";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import {
  BathIcon,
  BedIcon,
  FurnishedIcon,
  MapPinIcon,
  RoomIcon,
} from "../ui/icon";
import { useScopedI18n } from "@/locales/client";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { HousePropertiesType } from "@/data";
import { IMAGE_TYPES } from "@/lib/constant";
import CustomVideoPlayer from "./custom-video-player";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type PropertyCardProps = {
  image?: string;
  justImage?: true;
  data?: HousePropertiesType;
};

export default function PropertyCard({
  image,
  justImage,
  data,
}: PropertyCardProps) {
  const t = useScopedI18n("properties.cards");
  const [isLoading, setIsLoading] = useState(true);

  const existingElements = [
    data?.bed && Number(data.bed) > 0,
    data?.bath && Number(data.bath) > 0,
    data?.room && Number(data.room) > 0,
    data?.furnished,
    data?.size,
  ].filter(Boolean).length;

  return (
    <>
      {!justImage && (
        <div
          className={clsx(
            "flex-1 rounded-4xl w-full h-full overflow-hidden",
            !image && "bg-(--turquoise)"
          )}
        >
          {image && (
            <div className="relative w-full h-full overflow-hidden">
              {IMAGE_TYPES.includes(image.split(".").pop() as string) ? (
                <>
                  {isLoading && (
                    <Skeleton className="z-10 absolute inset-0 bg-neutral-300 rounded-none w-full h-full" />
                  )}
                  <Image
                    src={image}
                    alt={"Property"}
                    width={500}
                    height={500}
                    priority={true}
                    unoptimized={true}
                    loading="eager"
                    onLoadingComplete={() => setIsLoading(false)}
                    className="w-full h-full object-center object-cover"
                  />
                </>
              ) : (
                <CustomVideoPlayer autoPlay={false} src={image} />
              )}
              <div className="top-0 absolute flex items-end p-5 w-full h-full pointer-events-none">
                <div className="bg-(--turquoise) p-4 rounded-4xl w-full h-fit text-white pointer-events-auto">
                  <div
                    className={clsx(
                      "flex items-center gap-x-2 mb-5",
                      data?.price && Number(data?.price) > 0
                        ? "justify-between"
                        : "justify-end"
                    )}
                  >
                    {data?.price && Number(data?.price) > 0 ? (
                      <h2 className="font-semibold text-2xl">
                        {data?.price ? formatPrice(Number(data?.price)) : "???"}
                        <sup> xaf</sup>{" "}
                      </h2>
                    ) : null}
                    {data?.status && (
                      <Link
                        href={`/${data?.status === "Acheter" ? "buy" : "rent"}/${data?.id}`}
                      >
                        <span>
                          <ArrowUpRightIcon />
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="flex lg:flex-row flex-col justify-start lg:justify-between items-start lg:items-end gap-y-3">
                    <p className="flex items-center gap-x-1 font-medium">
                      <span className="flex justify-center items-center w-4 h-4">
                        <MapPinIcon />
                      </span>
                      {data?.location.includes("undefined") || !data?.location
                        ? "???"
                        : data?.location}
                    </p>

                    <div className="flex justify-between lg:justify-start items-center gap-x-3 bg-neutral-50/20 px-5 py-3 rounded-full w-full lg:w-fit">
                      {data?.size && (
                        <>
                          <p className="font-medium text-sm">
                            {data?.size ?? "???"}
                          </p>
                          <hr className="top-0.5 relative bg-neutral-50 w-px h-3" />
                        </>
                      )}
                      {data?.room && Number(data.room) > 0 ? (
                        <p className="flex items-center gap-x-1.5 text-sm">
                          <span className="flex justify-center items-center w-6 h-6">
                            <RoomIcon className="fill-(--light)" />{" "}
                          </span>{" "}
                          {data?.room ?? "?"}
                        </p>
                      ) : null}

                      {data?.bath && Number(data.bath) > 0 ? (
                        <>
                          <p className="flex items-center gap-x-1.5 text-sm">
                            <span className="flex justify-center items-center w-6 h-6">
                              <BedIcon className="fill-(--light)" />{" "}
                            </span>{" "}
                            {data?.bed ?? "?"}
                          </p>
                          <hr className="top-0.5 relative bg-neutral-50 w-[1px] h-3" />
                          <p className="flex items-center gap-x-1.5 text-sm">
                            <span className="flex justify-center items-center w-6 h-6">
                              <BathIcon className="fill-(--light)" />{" "}
                            </span>{" "}
                            {data?.bath ?? "?"}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!image && (
            <div className="flex flex-col justify-between p-5 w-full h-full text-white">
              <div className="space-y-3">
                <div
                  className={clsx(
                    "flex justify-between items-center gap-x-2 mb-2",
                    data?.price && Number(data?.price) > 0
                      ? "justify-between"
                      : "justify-end"
                  )}
                >
                  {data?.price && Number(data?.price) > 0 ? (
                    <h2 className="font-semibold text-2xl">
                      {data?.price ? formatPrice(Number(data?.price)) : "???"}
                      <sup> xaf</sup>{" "}
                    </h2>
                  ) : null}
                  {data?.status && (
                    <Link
                      href={`/${data?.status === "Acheter" ? "buy" : "rent"}/${data?.id}`}
                    >
                      <span>
                        <ArrowUpRightIcon />
                      </span>
                    </Link>
                  )}
                </div>
                <p className="flex items-center gap-x-1 font-medium">
                  <span className="flex justify-center items-center w-4 h-4">
                    <MapPinIcon />
                  </span>
                  {data?.location.includes("undefined")
                    ? "???"
                    : data?.location}
                </p>
              </div>
              <div className="flex justify-end w-full">
                <div
                  className={clsx(
                    "flex items-center gap-x-3 bg-neutral-50/20 px-4 py-3 rounded-full",
                    existingElements >= 3
                      ? "w-full justify-between "
                      : "w-fit justify-end"
                  )}
                >
                  {data?.size && (
                    <>
                      <p className="font-medium text-sm">
                        {data?.size ?? "???"}
                      </p>
                      {(data.room && Number(data.room) > 0) ||
                        (data.bath && Number(data.bath) > 0) ||
                        data.furnished ? (
                        <hr className="top-0.5 relative bg-neutral-50 w-[1px] h-3" />
                      ) : null}
                    </>
                  )}
                  {data?.room ? (
                    <>
                      <p className="flex items-center gap-x-1.5 text-sm">
                        <span className="flex justify-center items-center w-6 h-6">
                          <RoomIcon className="fill-(--light)" />{" "}
                        </span>{" "}
                        {data?.room ?? "?"}
                        <span className="hidden md:hidden xsl:inline mdss:!inline">
                          {t("room")}
                        </span>
                      </p>
                      {data.furnished &&
                        (data.bath || Number(data.bath) > 0) ? (
                        <hr className="top-0.5 relative bg-neutral-50 w-[1px] h-3" />
                      ) : null}
                    </>
                  ) : null}
                  {data?.bed ? (
                    <>
                      <p className="flex items-center gap-x-1.5 text-sm">
                        <span className="flex justify-center items-center w-6 h-6">
                          <BedIcon className="fill-(--light)" />{" "}
                        </span>{" "}
                        {data?.bed ?? "?"}
                        <span className="hidden md:hidden xsl:inline mdss:!inline">
                          {t("bedroom")}
                        </span>
                      </p>
                      <hr className="top-0.5 relative bg-neutral-50 w-[1px] h-3" />
                    </>
                  ) : null}
                  {data?.bath ? (
                    <>
                      <p className="flex items-center gap-x-1.5 text-sm">
                        <span className="flex justify-center items-center w-6 h-6">
                          <BathIcon className="fill-(--light)" />{" "}
                        </span>{" "}
                        {data?.bath ?? "?"}
                        <span className="hidden md:hidden xsl:inline mdss:!inline">
                          {t("bathroom")}
                        </span>
                      </p>
                      {data.furnished && (
                        <hr className="top-0.5 relative bg-neutral-50 w-[1px] h-3" />
                      )}
                    </>
                  ) : null}
                  {data?.furnished && (
                    <>
                      <p className="flex items-center gap-x-1.5 text-sm">
                        <span className="flex justify-center items-center w-6 h-6">
                          <FurnishedIcon className="fill-(--light)" />{" "}
                        </span>{" "}
                        <span className="hidden md:hidden mxs:!inline sm:inline">
                          {data?.bed ? t("furnished") : "?"}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {justImage && image && (
        <div className="relative rounded-[32px] w-full h-full overflow-hidden">
          {IMAGE_TYPES.includes(image.split(".").pop() as string) ? (
            <Image
              src={image}
              alt={"Image"}
              width={400}
              height={400}
              priority={true}
              unoptimized={true}
              loading="eager"
              className="w-full h-full object-center object-cover"
            />
          ) : (
            <CustomVideoPlayer autoPlay={false} src={image} />
          )}
        </div>
      )}
    </>
  );
}
