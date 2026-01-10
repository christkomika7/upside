"use client";
import React, { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import SocialMenu from "./social-menu";
import Language from "./language";
import Logo from "../logo";
import MobileMenu from "./mobile-menu";
import { useWidth } from "@/hooks/useWidth";

export default function Navbar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [larger, setLarger] = useState(0);
  const width = useWidth();

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setLarger(ref.current?.clientWidth);
    }
  }, [width]);
  return (
    <div className="top-0 z-50 fixed px-8 pt-2.5 w-full">
      <nav
        ref={ref}
        className="flex justify-between items-center bg-white mx-auto px-4 rounded-full w-full max-w-[1140px] h-[64px]"
      >
        <div className="mds:hidden block">
          <MobileMenu larger={larger as number} width={width} />
        </div>
        <div className="top-1 relative pl-1 max-w-[108px] h-9">
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-x-4">
          <Menu />
          <SocialMenu />
          <Language />
        </div>
      </nav>
    </div>
  );
}
