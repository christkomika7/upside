"use client";
import { HeroService } from "@/data";
import { useScopedI18n } from "@/locales/client";

type HeroCardProps = {
  service: HeroService;
  section?: "buy" | "rent" | "contact";
};

export default function HeroCard({ service, section = "buy" }: HeroCardProps) {
  const t = useScopedI18n(`${section}.hero.cards`);
  return (
    <div className="flex flex-col items-center bg-neutral-200/20 backdrop-blur-xl p-8 rounded-[42px] w-full min-h-[178px] text-(--light)">
      <span className="flex justify-center items-center mb-4 size-8">
        <service.icon className="fill-white !size-8" />
      </span>
      <h2 className="font-medium text-base md:text-lg text-center">
        {t(`${service.id}.title`)}
      </h2>
      <p className="text-sm text-center flex flex-col xs:flex-row gap-0.5 items-center pt-1">
        {t(`${service.id}.content`)
          .split("\n")
          .map((v, i) => (
            <span key={i}>{v}</span>
          ))}
      </p>
    </div>
  );
}
