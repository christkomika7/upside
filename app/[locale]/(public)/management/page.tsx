"use client";
import Footer from "@/components/footer/footer";
import Activities from "@/components/management/activities";
import Benefits from "@/components/management/benefits";
import Contact from "@/components/management/contact";
import Hero from "@/components/management/hero";
import Overlap from "@/components/overlap";
import UpTo from "@/components/UpTo";
import { useRef } from "react";

export default function ManagementPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <main>
      <UpTo />
      <Overlap ref={ref}>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane">
          <Activities />
        </div>
        <div className="pane">
          <Benefits />
        </div>

        <div className="pane">
          <Contact ref={ref} />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
