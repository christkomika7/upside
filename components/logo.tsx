import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  size?: "full" | "sm" | "xs";
  theme?: "dark" | "light";
  className?: string;
};

export default function Logo({
  size = "sm",
  theme = "dark",
  className,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx(
        "flex h-10 font-bold uppercase",
        size === "sm" && "h-10",
        size === "xs" && "h-6",
        size === "full" && "h-full",
        className
      )}
    >
      <Image
        src={theme === "dark" ? "/Logo.png" : "/LogoWhite.png"}
        alt="Logo"
        width={105}
        height={36}
        className="w-full h-full object-center object-contain"
      />
    </Link>
  );
}
