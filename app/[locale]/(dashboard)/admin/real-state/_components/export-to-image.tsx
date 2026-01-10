"use client";

import { exportToPdf } from "@/actions/realstate";
import { Spinner } from "@/components/ui/spinner";
import { rubik } from "@/font/font";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useState, useRef } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { MapPinIcon, QRCode, SizeIcon } from "@/components/ui/icon";
import FeatureBadgeList from "@/components/activity/feature-badge-list";
import { hero_contact_export } from "@/data";
import PdfContactCard from "@/components/card/pdf-contact-card";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "./image-with-skeleton";
import { env } from "@/env.config";
import { toast } from "sonner";

type ExportToImageProps = {
  id: string;
};

export default function ExportToImage({ id }: ExportToImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = useQuery({
    queryKey: ["realstate", id],
    queryFn: () => exportToPdf({ id }),
  });

  async function upload(e: React.SyntheticEvent) {
    e.preventDefault();

    if (ref.current && query.data) {
      const toastId = toast.loading("Génération du PDF en cours...");

      try {
        setIsLoading(true);
        const url = encodeURIComponent(
          `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/admin/real-state/export/${query.data.data.id}`
        );

        const res = await fetch(
          `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/realstate/convert?url=${url}`
        );

        if (!res.ok) throw new Error("Échec de la génération du PDF.");

        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${query.data.data.title}.pdf`;
        link.click();

        toast.success("PDF généré avec succès !", { id: toastId });
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors de la génération du PDF.", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between -space-y-0.5 pt-6">
        <h2
          className={clsx(
            "flex items-center gap-x-1 font-semibold text-(--turquoise) text-xl uppercase",
            rubik.className
          )}
        >
          <Link href="/admin/real-state">
            <ArrowLeftIcon size={15} />
          </Link>
          Modèle fiche de produit
        </h2>
        <Button
          variant="search"
          className="flex justify-center"
          onClick={upload}
          disabled={isLoading}
        >
          {isLoading && <Spinner className="mr-1 w-4 h-4 text-(--light)" />}
          {isLoading ? "Patientez..." : "Télécharger"}
        </Button>
      </div>
      {query.isLoading && (
        <div className="flex justify-center p-4">
          <Spinner className="w-6 h-6 text-neutral-600" />
        </div>
      )}
      {!query.isLoading && query.data?.data && (
        <div
          ref={ref}
          className="space-y-4 bg-(--light) w-full"
          id="capture-me"
        >
          <div className="gap-3 grid grid-cols-2 p-4">
            <div className="relative rounded-[32px] w-full h-[625px] overflow-hidden">
              {query.data.data.images[0] ? (
                <ImageWithSkeleton
                  src={query.data.data.images[0]}
                  alt="Image principale"
                  width={180}
                  height={90}
                  className="rounded-[32px] w-full h-full object-center object-cover"
                  style={{
                    aspectRatio: "3/4",
                  }}
                  loading="eager"
                  unoptimized={true}
                  priority={true}
                />
              ) : (
                <ImageWithSkeleton
                  src="/empty-image.png"
                  alt="Image vide"
                  width={180}
                  height={90}
                  className="rounded-[32px] w-full h-full object-center object-cover"
                  style={{
                    aspectRatio: "3/4",
                  }}
                  loading="eager"
                  unoptimized={true}
                  priority={true}
                />
              )}
              <div className="top-0 left-0 z-20 absolute flex bg-(--light) w-[190px] h-[90px]">
                <ImageWithSkeleton
                  src="/Logo.png"
                  alt="Logo"
                  width={180}
                  height={90}
                  className="top-7 relative object-center object-contain"
                  loading="eager"
                  unoptimized={true}
                />
              </div>
              <div
                className={clsx(
                  "top-[50px] left-[60px] absolute bg-transparent shadow-[#f8f7f5] shadow-[50px_0_0_0] rounded-br-[32px] w-[90px] h-[50px]"
                )}
              ></div>
              <div
                className={clsx(
                  "top-0 left-[200px] absolute bg-transparent shadow-[-50px_0_0_0] shadow-[#f8f7f5] rounded-tl-[32px] w-[90px] h-[50px]"
                )}
              ></div>
              <div
                className={clsx(
                  "top-[100px] left-0 absolute bg-transparent shadow-[#f8f7f5] shadow-[0_-40px_0_0] rounded-tl-[32px] w-[160px] h-[70px]"
                )}
              ></div>
            </div>
            <div className="gap-3 grid grid-cols-2">
              {(() => {
                const images: string[] =
                  query.data.data.images?.slice(1, 7) || [];
                const filledImages = images.filter(Boolean);
                const displayImages =
                  filledImages.length === 0
                    ? Array(2).fill("/empty-image.png")
                    : [...filledImages];
                while (displayImages.length < 7) {
                  displayImages.push("");
                }

                return displayImages.map((imageSrc, i) => {
                  if (imageSrc) {
                    const stableImageSrc =
                      (window as any).__preloadedImageUrls?.get(imageSrc) ||
                      `${imageSrc}?stable=${id}_${i}`;

                    return (
                      <div
                        key={`${i}-${stableImageSrc}`}
                        className="rounded-[32px] w-full h-[200px] overflow-hidden"
                      >
                        <ImageWithSkeleton
                          src={imageSrc}
                          alt={`Image ${i + 1}`}
                          width={180}
                          height={150}
                          className="rounded-[32px] w-full h-full object-center object-cover"
                          style={{ aspectRatio: "3/4" }}
                          loading="eager"
                          unoptimized={true}
                          priority={i < 2}
                        />
                      </div>
                    );
                  }

                  return null;
                });
              })()}
            </div>
          </div>

          <div className="space-y-6 bg-(--turquoise) pt-6 rounded-t-[64px] w-full">
            <div className="space-y-3 bg-white mx-6 p-6 rounded-[32px]">
              <h2 className="font-semibold text-(--deep-dark) text-lg">
                {query.data.data.title}
              </h2>
              <pre
                className={clsx(
                  "text-sm break-words whitespace-pre-wrap",
                  rubik.className
                )}
              >
                {query.data.data.description}
              </pre>

              <div className="flex justify-between items-center gap-x-2">
                <div className="flex items-center gap-x-4">
                  {query.data.data.price &&
                  Number(query.data.data.price) > 0 ? (
                    <p className="font-semibold text-(--deep-dark) text-base md:text-xl lg:text-2xl">
                      {formatPrice(Number(query.data.data.price))}
                      <sup>xaf</sup>
                    </p>
                  ) : null}
                  {query.data.data.dimension && (
                    <p className="flex items-center gap-x-1.5 text-(--deep-dark) text-sm">
                      <span className="flex w-5 h-5 font-semibold text-(--dark-turquoise)">
                        <SizeIcon className="fill-(dark-turquoise)" />
                      </span>
                      {query.data.data.dimension}
                    </p>
                  )}
                </div>
                <Badge variant="address" className="w-full sm:w-fit h-[40px]">
                  <span className="flex w-3 h-3">
                    <MapPinIcon className="fill-neutral-700" />
                  </span>
                  {query.data.data.city}, {query.data.data.area}
                </Badge>
              </div>
              <FeatureBadgeList
                data={query.data.data}
                options={query.data.data.options}
              />
            </div>
            <div
              className="relative bg-blue-500 rounded-t-[64px] w-full h-[260px]"
              style={{
                backgroundImage: "url('/assets/asset.jpg')",
                backgroundSize: "cover",
              }}
            >
              <Image
                src="/assets/asset.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="absolute opacity-0 rounded-t-[64px]"
                loading="eager"
                unoptimized={true}
              />
              <div className="top-0 left-0 absolute bg-gradient-to-t from-(--dark-turquoise) to-transparent w-full h-full"></div>
              <div className="z-10 relative gap-3 grid grid-cols-[1fr_1fr_1fr_150px] p-6 pb-2">
                {hero_contact_export.map((service) => (
                  <PdfContactCard key={service.id} service={service} />
                ))}
                <div className="flex flex-col items-center bg-neutral-200/20 backdrop-blur-xl p-6 rounded-[32px] w-full min-h-[178px text-(--light)">
                  <div className="w-full h-full">
                    <QRCode />
                  </div>
                </div>
              </div>
              <p
                className={clsx(
                  "z-10 relative flex justify-end pr-4 font-bold text-white text-sm",
                  rubik.className
                )}
              >
                Discuter avec nous sur <br /> WhatsApp maintenant
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
