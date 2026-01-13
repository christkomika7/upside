"use client";
import { categories } from "@/data";
import CategoryCard from "../card/category-card";
import CategoriesSlider from "../caroussel/categories-slider";
import { useScopedI18n } from "@/locales/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { categoriesTotals } from "@/actions/realstate";
import { RealStateCategoriesType, RequestResponse } from "@/lib/type";

export default function Categories() {
  const t = useScopedI18n("categories.title");

  const query: UseQueryResult<RequestResponse<RealStateCategoriesType>, Error> =
    useQuery({
      queryKey: ["categories"],
      queryFn: categoriesTotals,
    });

  return (
    <div className="relative bg-(--light)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-9 md:mb-12 font-semibold text-(--deep-dark) text-[30px] sm:text-[44px] text-center">
          {t("left")} <span className="text-(--turquoise)">{t("right")}</span>
        </h2>
        <div className="hidden gap-4 sm:grid grid-cols-2 md:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.id}
              index={i}
              {...category}
              isLoading={query.isLoading}
              values={[
                query.data?.data?.villa ?? 0,
                query.data?.data?.apartment ?? 0,
                query.data?.data?.warehouse ?? 0,
                query.data?.data?.office ?? 0,
                query.data?.data?.land ?? 0,
                query.data?.data?.commercial ?? 0,
              ]}
            />
          ))}
        </div>
        <div className="sm:hidden block relative pt-18 h-[450px]">
          <CategoriesSlider
            categories={categories}
            isLoading={query.isLoading}
            values={[
              query.data?.data?.villa ?? 0,
              query.data?.data?.apartment ?? 0,
              query.data?.data?.warehouse ?? 0,
              query.data?.data?.office ?? 0,
              query.data?.data?.land ?? 0,
              query.data?.data?.commercial ?? 0,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
