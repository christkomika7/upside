"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Maximize2Icon } from "lucide-react";
import clsx from "clsx";
import useImage from "@/stores/useImage";
import SliderMediaContainer from "./slider-media-container";

type ActivitiesModalSlider = {
  images: string[];
};

export default function ActivitiesModalSlider({
  images,
}: ActivitiesModalSlider) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const setShow = useImage.use.setShow();
  const setImages = useImage.use.setImages();
  const setPosition = useImage.use.setPosition();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    loop: true,
    slides: {
      number: images.length,
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
      <div className="relative w-full h-full navigation-wrapper">
        <div ref={sliderRef} className="w-full h-full keen-slider">
          {images.map((image, i) => (
            <div
              key={i}
              className="relative w-full min-w-[264px] sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide number-slide1"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShow(true);
                  setImages([
                    ...images.map((img) => ({
                      title: "Slider " + (i + 1),
                      url: img,
                    })),
                  ]);
                  setPosition(i);
                }}
                variant="pagination"
                className="right-4 bottom-4 z-20 absolute bg-white w-10 h-10"
              >
                <Maximize2Icon size={15} />
              </Button>
              <SliderMediaContainer media={image} index={i} />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div className="top-0 left-0 z-20 absolute flex justify-between items-center px-4 w-full h-full text-(--light) pointer-events-none">
            <div className="w-9 h-9">
              <Button
                variant="pagination"
                className={clsx(
                  "bg-(--turquoise) w-9 h-9 text-(--light) pointer-events-auto",
                  currentSlide === 0 && "hidden",
                )}
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              >
                <ArrowLeftIcon />
              </Button>
            </div>
            <div className="w-9 h-9">
              <Button
                variant="pagination"
                className={clsx(
                  "bg-(--turquoise) w-9 h-9 text-(--light) pointer-events-auto",
                  currentSlide ===
                    instanceRef.current.track.details.slides.length - 1 &&
                    "hidden",
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
        <div className="top-0 left-0 z-20 absolute flex justify-center items-end pb-3 w-full h-full text-(--light) pointer-events-none">
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    "h-1.5 w-2 mx-0.5 transition-all pointer-events-auto cursor-pointer ease-in-out duration-200 bg-amber-50 rounded-full" +
                    (currentSlide === idx ? " w-8 active" : "")
                  }
                ></button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
