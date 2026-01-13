"use client";
import { buy } from "@/actions/realstate";
import Hero from "@/components/activity/buy/hero";
import Products from "@/components/activity/products";
import Footer from "@/components/footer/footer";
import Overlap from "@/components/overlap";
import UpTo from "@/components/UpTo";
import useQueryAction from "@/hooks/useQueryAction";
import { HouseFilterType, RealStateType, RequestResponse } from "@/lib/type";
import { useScopedI18n } from "@/locales/client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function BuyPage() {
  const t = useScopedI18n("buy.product");
  const [isLoading, setIsLoading] = useState(true);
  const dynamicElement = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const { mutate, data } = useQueryAction<
    HouseFilterType,
    RequestResponse<RealStateType[]>
  >(
    buy,
    () => {
      setIsLoading(false);
      if (sectionRef.current && searchParams.toString() !== "") {
        sectionRef.current.scrollIntoView({
          block: "start",
        });
      }
    },
    ["buy_houses"],
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
            ref={dynamicElement}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mutate={mutate}
            data={data}
            category="buy"
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
