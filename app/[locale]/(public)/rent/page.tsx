"use client";
import { rent } from "@/actions/realstate";
import Products from "@/components/activity/products";
import Hero from "@/components/activity/rent/hero";
import Footer from "@/components/footer/footer";
import Overlap from "@/components/overlap";
import UpTo from "@/components/UpTo";
import useQueryAction from "@/hooks/useQueryAction";
import { HouseFilterType, RealStateType, RequestResponse } from "@/lib/type";
import { useScopedI18n } from "@/locales/client";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function RentPage() {
  const t = useScopedI18n("rent.product");
  const [isLoading, setIsLoading] = useState(true);
  const dynamicElement = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const { mutate, data } = useQueryAction<
    HouseFilterType,
    RequestResponse<RealStateType>
  >(
    rent,
    () => {
      setIsLoading(false);
      if (sectionRef.current && searchParams.toString() !== "") {
        sectionRef.current.scrollIntoView({
          block: "start",
        });
      }
    },
    ["rent_houses"],
    undefined,
    false
  );
  return (
    <main>
      <UpTo />
      <Overlap ready={!isLoading} ref={dynamicElement}>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane" ref={sectionRef}>
          <Products
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mutate={mutate}
            data={data}
            category="rent"
            ref={dynamicElement}
            title={
              <>
                {t("title.left")}{" "}
                <span className="text-(--turquoise)">{t("title.right")}</span>
              </>
            }
          />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
