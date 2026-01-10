"use client";
import { HeroService } from "@/data";
import { useScopedI18n } from "@/locales/client";

type PdfContactCardProps = {
  service: HeroService;
};

export default function PdfContactCard({ service }: PdfContactCardProps) {
  const t = useScopedI18n(`contact.hero.cards`);
  return (
    <div className="flex flex-col items-center bg-neutral-200/20 backdrop-blur-xl px-2 py-8 rounded-[32px] w-full min-h-[178px text-(--light)">
      <span className="flex justify-center items-center mb-2 size-6">
        <service.icon className="fill-white !size-8" />
      </span>
      <h2 className="font-medium text-sm  text-center">{service.title}</h2>
      <p className="text-xs text-center flex flex-col gap-0.5 items-center pt-1">
        {service.content.split("\n").map((v, i) => (
          <span key={i}>{v}</span>
        ))}
      </p>
    </div>
  );
}
