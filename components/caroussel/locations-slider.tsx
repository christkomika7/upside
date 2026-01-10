"use client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import LocationCard from "../card/location-card";

type LocationsSliderProps = {
  datas: {
    img?: string;
    title: string;
    value: number;
    url: string;
  }[];
  isLight?: true;
  isLoading?: boolean;
};

export default function LocationsSlider({
  datas,
  isLight,
  isLoading,
}: LocationsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: {
      number: datas.length,
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
          {datas.map((data, index) => (
            <div
              key={index}
              className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide1"
            >
              <LocationCard
                img={data.img}
                title={data.title}
                value={data.value}
                color={isLight ? "green" : "light"}
                isLoading={isLoading}
                full
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && !isLight && (
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
          <div
            className={clsx(
              "-bottom-8 absolute rounded-full w-[80%] h-0.5 overflow-hidden dots",
              isLight ? "bg-(--light)/20" : "bg-(--deep-dark)/20"
            )}
          >
            <span
              className={clsx(
                "block bg-(--deep-dark) rounded-full h-0.5 transition-all duration-200 ease-in-out",
                isLight ? "bg-(--light)" : "bg-(--deep-dark)"
              )}
              style={{
                width: `${
                  (100 / datas.length) *
                  (instanceRef.current?.track.details.rel + 1)
                }%`,
              }}
            ></span>
          </div>
        </div>
      )}
    </>
  );
}
