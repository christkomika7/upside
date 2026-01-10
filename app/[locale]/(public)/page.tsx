"use client";
import Footer from "@/components/footer/footer";
import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import Location from "@/components/home/location";
import Properties from "@/components/home/properties";
import Teams from "@/components/home/teams";
import Testimonial from "@/components/home/testimonial";
import Overlap from "@/components/overlap";
import UpTo from "@/components/UpTo";
import useActualize from "@/stores/useActualize";
import useFilterLocation from "@/stores/useFilterLocation";
import useFilters from "@/stores/useFilters";
import useHeroFilters from "@/stores/useHeroFilters";
import useRentFilter from "@/stores/useRentFilter";
import { useEffect } from "react";

export default function Home() {
  const state = useActualize.use.state();
  const f = useFilters.use.clear();
  const b = useHeroFilters.use.clear();
  const r = useRentFilter.use.clear();
  const l = useFilterLocation.use.clear();

  useEffect(() => {
    if (state === 0) {
      window.scrollTo({ top: 0 });
    }
    if (state !== 0) {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  }, [state]);

  useEffect(() => {
    f();
    b();
    r();
    l();
  }, []);

  return (
    <main>
      <UpTo />
      <Overlap state={state}>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane">
          <Properties />
        </div>
        <div className="pane">
          <Categories />
        </div>
        <div className="pane">
          <Location />
          <Teams />
        </div>
        <div className="pane">
          <Testimonial />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
