"use client";
import InfoProduct from "@/components/activity/info-product";
import Hero from "@/components/activity/rent/hero";
import Footer from "@/components/footer/footer";
import Overlap from "@/components/overlap";
import ViewImage from "@/components/view-image";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function InfoRentPage() {
  const id = useParams().id as string;
  const [isLoading, setIsLoading] = useState(true);
  const dynamicElement = useRef<HTMLDivElement>(null);
  return (
    <main>
      <ViewImage />
      <Overlap ready={isLoading} ref={dynamicElement}>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane">
          <InfoProduct
            id={id}
            setIsLoading={setIsLoading}
            ref={dynamicElement}
          />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
