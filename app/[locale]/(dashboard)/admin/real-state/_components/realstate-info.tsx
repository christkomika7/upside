"use client";

import { unique } from "@/actions/realstate";
import InfoCard from "@/components/card/info-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { rubik } from "@/font/font";
import { RealStateType } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
type RealstateInfoProps = {
  id: string;
};

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import v from "voca";
import { ReactSVG } from "react-svg";
import { IMAGE_TYPES } from "@/lib/constant";
import GoogleMapview from "@/components/google-mapview";

export default function RealstateInfo({ id }: RealstateInfoProps) {
  const [data, setData] = useState<RealStateType>();

  const query = useQuery({
    queryKey: ["realstate", id],
    queryFn: () => unique({ id }),
  });

  useEffect(() => {
    if (query.data) {
      setData(query.data.data);
    }
  }, [query.data]);

  return (
    <div className="space-y-4">
      <div className="-space-y-0.5 pt-6">
        <h2
          className={clsx(
            "flex items-center gap-x-1 font-semibold text-(--turquoise) text-xl uppercase",
            rubik.className
          )}
        >
          <Link href="/admin/real-state">
            <ArrowLeftIcon size={15} />
          </Link>
          Information
        </h2>
        {query.isLoading && (
          <Skeleton className="bg-neutral-200 mt-1 rounded-full w-[200px] h-2" />
        )}
        {!query.isLoading && data && (
          <div className="flex items-center gap-x-2 pt-2">
            <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
              {data.title}
            </p>
            <Badge variant={data.online ? "success" : "error"}>
              {data.online ? "En ligne" : "Hors ligne"}
            </Badge>
          </div>
        )}
      </div>
      {query.isLoading && (
        <div className="flex justify-center p-4">
          <Spinner className="w-6 h-6 text-neutral-600" />
        </div>
      )}
      {!query.isLoading && data && (
        <>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
            <InfoCard title="Titre" content={data.title} />
            <InfoCard title="Proprieté" content={data.property} />
            <InfoCard title="Status" content={data.status} />
            <InfoCard title="Ville" content={data.city} />
            <InfoCard title="Quartier" content={data.area} />
            <InfoCard title="Chambres" content={data.bedroom} />
            <InfoCard title="Douches" content={data.bathroom} />
            <InfoCard title="Pièces" content={data.room} />
            <InfoCard title="Dimension" content={data.dimension ?? "Vide"} />
            <InfoCard
              title="Prix"
              content={
                data.price && Number(data.price) > 0 ? data.price : "N/A"
              }
            />
            <InfoCard
              title="Numéro de téléphone"
              content={data.phone ?? "Vide"}
            />
            <InfoCard
              title="Numéro Whatsapp"
              content={data.whatsapp ?? "Vide"}
            />
          </div>
          <div className="gap-2 grid grid-cols-1">
            <InfoCard title="Adresse mail" content={data.email ?? "Vide"} />
          </div>
          <div className="gap-2 grid grid-cols-1">
            <InfoCard
              title="Description"
              content={data.description}
              pre={true}
            />
          </div>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
            <InfoCard title="Meublé" content={data.furnished ? "Oui" : "Non"} />
            <InfoCard
              title="Cuisine équipé"
              content={data.equippedKitchen ? "Oui" : "Non"}
            />
            <InfoCard title="Terrace" content={data.terrace ? "Oui" : "Non"} />
            <InfoCard
              title="Sécurité"
              content={data.security ? "Oui" : "Non"}
            />
            <InfoCard title="PMR" content={data.pmr ? "Oui" : "Non"} />
            <InfoCard
              title="Ascenceur"
              content={data.elevator ? "Oui" : "Non"}
            />
            <InfoCard title="Vue" content={data.view} />
            <InfoCard title="Piscine" content={data.pool ? "Oui" : "Non"} />
            <InfoCard
              title="Internet"
              content={data.internet ? "Oui" : "Non"}
            />
            <InfoCard
              title="Salle de sport"
              content={data.gym ? "Oui" : "Non"}
            />
            <InfoCard title="Jardin" content={data.garden ? "Oui" : "Non"} />
            <InfoCard
              title="Groupe élèctrogène"
              content={data.generator ? "Oui" : "Non"}
            />
            <InfoCard
              title="Garage / Parking"
              content={data.parking ? "Oui" : "Non"}
            />
            <InfoCard
              title="Climatisation"
              content={data.clim ? "Oui" : "Non"}
            />
          </div>
          {data.options.length > 0 && (
            <div className="relative flex flex-wrap gap-1 bg-(--blue-light)/40 p-2 rounded-lg w-full">
              {data.options?.map((option) => (
                <Badge
                  variant="filter2"
                  key={option.id}
                  className="gap-x-2 grid grid-cols-[20px_1fr] rounded-md !w-fit"
                >
                  {option.icon && option.icon.endsWith(".svg") ? (
                    <Image
                      src={option.icon}
                      alt={option.name}
                      width={20}
                      height={20}
                    />
                  ) : null}
                  {v.titleCase(option.name)}
                </Badge>
              ))}
            </div>
          )}

          <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {data?.images.map((image, index) => (
              <div
                key={index}
                className="bg-background shadow-slate-400/30 shadow-sm p-2 rounded-lg h-[200px] overflow-hidden"
              >
                {IMAGE_TYPES.includes(image.split(".").pop() as string) ? (
                  <Image
                    src={image}
                    alt={"Image " + index}
                    width={250}
                    height={250}
                    className="rounded-lg w-full h-full object-center object-cover overflow-hidden"
                  />
                ) : (
                  <video
                    preload="metadata"
                    controls
                    className="rounded-lg w-full h-full object-center object-cover overflow-hidden"
                  >
                    {image.split(".").pop() === "mp4" && (
                      <source src={image} type="video/mp4" />
                    )}
                    {image.split(".").pop() === "webm" && (
                      <source src={image} type="video/webm" />
                    )}
                    {image.split(".").pop() === "mov" && <source src={image} />}
                  </video>
                )}
              </div>
            ))}
          </div>
          <div
            className={clsx(
              "flex justify-center items-center bg-background shadow-slate-400/30 shadow-sm p-2 border border-transparent rounded-lg w-full h-[350px] overflow-hidden"
            )}
          >
            <GoogleMapview
              value={[
                {
                  title: data.title,
                  image: data.images[0],
                  lat: Number(data.position[0]),
                  lng: Number(data.position[1]),
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
