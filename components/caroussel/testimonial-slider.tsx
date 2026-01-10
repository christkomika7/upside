"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import TestimonialCard from "../card/testimonial-card";
import { GoogleReviewType } from "@/lib/type";

type TestimonialCardProps = {
  testimonials: GoogleReviewType[];
};
export default function TestimonialSlider({
  testimonials,
}: TestimonialCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      number: testimonials.length,
      origin: testimonials.length > 3 ? "center" : "auto",
      perView: "auto",
      spacing: 15,
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    if (testimonials.length <= 3) {
      slider.update({ slides: { perView: testimonials.length } });
    }

    const interval = setInterval(() => {
      slider.next();
    }, 4000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <>
      <div className="relative w-full h-full navigation-wrapper">
        <div ref={sliderRef} className="w-full h-full keen-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full min-w-full sm:min-w-[560px] max-w-[560px] h-full keen-slider__slide"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {loaded && instanceRef.current && (
          <div className="hidden md:block top-0 left-0 absolute px-4 w-full h-full pointer-events-none">
            <div className="-top-[148px] right-0 absolute flex justify-center gap-x-4">
              <Button
                variant="slider"
                className="w-11 h-11 pointer-events-auto"
                disabled={instanceRef.current.track.details.rel === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                variant="slider"
                disabled={
                  instanceRef.current.track.details.rel ===
                  testimonials.length - 1
                }
                className="w-11 h-11 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dots Progress */}
      {loaded && instanceRef.current && (
        <div className="top-0 left-0 absolute flex justify-center items-end pb-3 w-full h-full pointer-events-none">
          <div className="-bottom-10 absolute bg-(--deep-dark)/20 rounded-full w-full h-0.5 overflow-hidden dots">
            <span
              className="block bg-(--deep-dark) rounded-full h-0.5 transition-all duration-500 ease-in-out"
              style={{
                width: `${
                  (100 / testimonials.length) *
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
