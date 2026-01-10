import Image from "next/image";
import HeroCard from "./card/hero-card";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { HeroService } from "@/data";

type HeaderProps = {
  img: string;
  title: string;
  content?: string;
  services: HeroService[];
  section: "buy" | "rent" | "contact";
};

export default function Header({
  img,
  title,
  content,
  services,
  section,
}: HeaderProps) {
  return (
    <header className="relative flex flex-col justify-center items-center w-full h-full min-h-screen tall:min-h-[900px]">
      <Image
        src={img}
        alt="Hero Contact"
        fill
        className="top-0 absolute w-full h-full object-center object-cover"
      />
      <div className="top-0 left-0 z-10 absolute bg-gradient-to-t from-(--dark-turquoise) to-transparent w-full h-full"></div>
      <div className="z-20 relative flex flex-col justify-center items-center py-[100px] w-full h-full">
        <h2
          className={clsx(
            "px-2 font-bold text-[32px] text-neutral-100 md:text-[58px] lg:text-[78px] text-center leading-[110%] xs:-[42px]",
            !content && "mb-8"
          )}
        >
          {title}
        </h2>
        {content && (
          <p
            className={clsx(
              rubik.className,
              "max-w-[855px] mb-8 mx-auto text-center text-base md:text-xl px-2 text-(--light)"
            )}
          >
            {content}
          </p>
        )}
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 w-full max-w-[1146px]">
          {services.map((service) => (
            <HeroCard key={service.id} section={section} service={service} />
          ))}
        </div>
      </div>
    </header>
  );
}
