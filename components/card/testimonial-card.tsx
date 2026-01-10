"use client";
import { GoogleReviewType } from "@/lib/type";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type TestimonialCardProps = GoogleReviewType;

export default function TestimonialCard(review: TestimonialCardProps) {
  const t = useScopedI18n("client.cards");
  const locale = useCurrentLocale();

  return (
    <div className="bg-white px-4 py-6 rounded-[32px]">
      <div className="flex justify-between gap-x-2 mb-2">
        <div className="flex items-center gap-x-2">
          <div className="relative rounded-full w-[56px] h-[56px] overflow-hidden">
            {review.profile_photo_url && (
              <Image
                src={review.profile_photo_url}
                alt={review.author_name}
                width={56}
                height={56}
                className="w-full h-full object-center object-cover"
              />
            )}
          </div>
          <p className="font-semibold">{review.author_name}</p>
        </div>
        <small className="font-semibold text-neutral-400 text-sm">
          {new Date(review.time * 1000).toLocaleDateString(locale, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </small>
      </div>
      <p className="flex items-center gap-x-2 mb-1 font-medium text-(--deep-dark)">
        {review.rating}
        <span className="flex items-center gap-x-0.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = review.rating;
            const isFullStar = i < Math.floor(rating);
            const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;

            return (
              <StarIcon
                key={i}
                size={18}
                className={
                  isFullStar
                    ? "fill-amber-500 stroke-amber-500"
                    : isHalfStar
                      ? "fill-gradient-lr from-amber-500 from-50% to-gray-300 to-50% stroke-amber-500"
                      : "fill-gray-300 stroke-gray-300"
                }
              />
            );
          })}
        </span>
      </p>
      <p className="min-h-[90px] text-neutral-600 text-sm">{review.text}</p>
    </div>
  );
}
