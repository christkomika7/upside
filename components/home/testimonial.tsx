"use client";
import { MessageSquareQuoteIcon, StarIcon } from "lucide-react";
import TestimonialSlider from "../caroussel/testimonial-slider";
import { GoogleIcon } from "../ui/icon";
import { useScopedI18n } from "@/locales/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GoogleReviewType } from "@/lib/type";
import { reviews } from "@/actions/google";
import { Skeleton } from "../ui/skeleton";
import ReviewLoader from "../review-loader";

export default function Testimonial() {
  const t = useScopedI18n("client");
  const query = useQuery({
    queryKey: ["reviews"],
    queryFn: reviews,
  });

  return (
    <div className="relative bg-(--blue-fade)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--blue-fade) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <div className="flex items-center gap-x-2 px-1 xs:px-4 sm:px-0">
          <h2 className="font-semibold text-(--deep-dark) text-[30px] sm:text-[56px] text-center">
            {t("title.left")}{" "}
            <span className="text-(--turquoise)">{t("title.right")}</span>
          </h2>
        </div>
        <div className="items-start gap-x-1 grid grid-cols-[54px_1fr] mb-8 px-1 xs:px-4 sm:px-0">
          <span className="flex justify-center items-start w-14 h-14">
            <GoogleIcon />
          </span>
          <div className="text-(--deep-dark)">
            <small className="font-bold">{t("google.title")}</small>
            {query.isLoading && <Skeleton className="bg-white w-[190px] h-4" />}
            {!query.isLoading && query.data && (
              <p className="flex xs:flex-row flex-col items-start xs:items-center gap-x-2">
                <span className="flex items-center gap-x-2">
                  <span className="font-medium text-lg">
                    <span className="font-extrabold">{query.data.data?.rating}</span>
                    /5
                  </span>
                  <span className="flex items-center gap-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const rating = query.data.data?.rating || 0;
                      const isFullStar = i < Math.floor(rating);
                      const isHalfStar =
                        i === Math.floor(rating) && rating % 1 !== 0;

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
                </span>
                <span className="text-lg">
                  (
                  <span className="font-semibold">
                    {query.data.data?.totalReviews}
                  </span>{" "}
                  <span className="underline">{t("google.review")}</span>)
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          {query.isLoading && (
            <div className="flex flex-nowrap justify-center items-center gap-4 h-[258px] overflow-x-hidden">
              <ReviewLoader />
              <div className="hidden md:block w-full h-full">
                <ReviewLoader />
              </div>
            </div>
          )}
          {!query.isLoading && query.data && query.data.data && query.data.data.reviews.length > 0 && (
            <TestimonialSlider testimonials={query.data.data.reviews} />
          )}
          {!query.isLoading &&
            query.data &&
            query.data.data &&
            query.data.data.reviews.length === 0 && (
              <div className="flex flex-col justify-center items-center bg-white/90 backdrop-blur-2xl rounded-[32px] h-[258px]">
                <MessageSquareQuoteIcon className="text-neutral-500" />
                <h2 className="mt-0.5 max-w-[400px] text-neutral-600 text-lg text-center">
                  Aucun avis pour le moment
                </h2>
                <p className="max-w-[400px] text-neutral-500 text-sm text-center">
                  Soyez le premier à partager votre expérience avec nous ! Votre
                  avis compte.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
