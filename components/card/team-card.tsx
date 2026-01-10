"use client";
import { TeamType } from "@/data";
import { useScopedI18n } from "@/locales/client";
import Image from "next/image";

type TeamCardProps = TeamType;

export default function TeamCard({ id, img, name }: TeamCardProps) {
  const t = useScopedI18n("teams.cards");

  return (
    <div className="justify-items-center gap-5 grid grid-rows-[auto_1fr] p-4">
      {/* Image */}
      <div className="place-items-center grid rounded-full w-[186px] h-[186px] min-h-0 overflow-hidden">
        <Image
          src={img}
          alt={name}
          width={186}
          height={186}
          priority
          unoptimized
          className="w-[186px] h-[186px] object-cover object-top scale-[1.01]"
        />
      </div>

      {/* Texte */}
      <div className="justify-items-center justify-self-start grid grid-rows-[auto_1fr] min-h-0 text-center">
        <h2 className="min-h-7 font-medium text-(--deep-dark) text-lg">
          {name}
        </h2>
        <div className="justify-items-center grid grid-rows-[auto_auto] h-fit">
          <p className="font-medium text-(--turquoise) text-lg">
            {t(`${id}.title`)}
          </p>
          <p className="self-start h-full text-(--deep-dark) text-sm">
            {t(`${id}.content`)}
          </p>
        </div>
      </div>
    </div>
  );
}
