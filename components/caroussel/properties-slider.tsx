"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import PropertyCard from "../card/property-card";
import { HousePropertiesType } from "@/data";
import { Skeleton } from "../ui/skeleton";

type PropertiesSliderProps = {
  isLoading: boolean;
  first: {
    image: string;
    data?: HousePropertiesType;
  };
  second: {
    image: string;
  };

  third: {
    image: string;
  };

  unique: {
    data?: HousePropertiesType;
  };
};

export default function PropertiesSlider({
  first,
  second,
  third,
  unique,
  isLoading,
}: PropertiesSliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "snap",
    slides: {
      number: 4,
      origin: "center",
      perView: "auto",
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="w-full h-full navigation-wrapper">
        <div ref={sliderRef} className="w-full h-full keen-slider">
          <div className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide1">
            {isLoading ? (
              <Skeleton className="bg-neutral-200 rounded-[32px] w-full h-full" />
            ) : (
              <PropertyCard image={first.image} data={first.data} />
            )}
          </div>
          <div className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide2">
            {isLoading ? (
              <Skeleton className="bg-neutral-200 rounded-[32px] w-full h-full" />
            ) : (
              <PropertyCard data={unique.data} />
            )}
          </div>
          <div className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide2">
            {isLoading ? (
              <Skeleton className="bg-neutral-200 rounded-[32px] w-full h-full" />
            ) : (
              <PropertyCard image={second.image} justImage />
            )}
          </div>
          <div className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide4">
            {isLoading ? (
              <Skeleton className="bg-neutral-200 rounded-[32px] w-full h-full" />
            ) : (
              <PropertyCard image={third.image} justImage />
            )}
          </div>
        </div>
        {loaded && instanceRef.current && (
          <div className="top-0 left-0 absolute flex justify-center gap-x-4 px-4 w-full h-full text-(--light) pointer-events-none">
            <div className="w-11 h-11">
              <Button
                variant="pagination"
                className={clsx(
                  "bg-(--brown) w-11 h-11 text-(--light) pointer-events-auto"
                )}
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              >
                <ArrowLeftIcon />
              </Button>
            </div>
            <div className="w-11 h-11">
              <Button
                variant="pagination"
                className={clsx(
                  "bg-(--brown) w-11 h-11 text-(--light) pointer-events-auto"
                )}
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="top-0 left-0 absolute flex justify-center items-end pb-3 w-full h-full text-(--light) pointer-events-none">
          <div className="-bottom-10 absolute bg-(--deep-dark)/20 rounded-full w-[80%] h-0.5 overflow-hidden dots">
            <span
              className="block bg-(--deep-dark) rounded-full h-0.5 transition-all duration-200 ease-in-out"
              style={{
                width: `${
                  (100 / 4) * (instanceRef.current?.track.details.rel + 1)
                }%`,
              }}
            ></span>
          </div>
        </div>
      )}
    </>
  );
}
