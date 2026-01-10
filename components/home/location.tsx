"use client";
import LocationFilter from "../filter/location-filter";
import FiltersCard from "../card/filters-card";
import { useScopedI18n } from "@/locales/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { locationsTotals } from "@/actions/realstate";
import LocationCard from "../card/location-card";
import { RealStateLocationType } from "@/lib/type";
import LocationsSlider from "../caroussel/locations-slider";
import { locations } from "@/data";

export default function Location() {
  const t = useScopedI18n("locations");
  const query: UseQueryResult<{ data: RealStateLocationType }, Error> =
    useQuery({
      queryKey: ["locations"],
      queryFn: locationsTotals,
    });

  return (
    <div className="relative bg-(--dark-green)">
      <div className="-top-[54px] left-0 z-10 absolute bg-(--dark-green) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-24 max-w-[1140px]">
        <div className="flex mld:flex-row flex-col justify-center items-center gap-x-12 gap-y-4 mb-9 md:mb-12 lg:mb-[54px]">
          <h2 className="min-w-fit font-semibold text-(--blue-light) text-[30px] sm:text-[44px] text-center">
            {t("title.left")}{" "}
            <span className="text-(--bright-green)">{t("title.right")}</span>
          </h2>
          <LocationFilter />
        </div>

        <div className="hidden md:block space-y-4">
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <div className="gap-4 grid grid-cols-2">
              <LocationCard
                img={query.data?.data.areas[0]?.randomImage ?? ""}
                title={query.data?.data.areas[0]?.area ?? "???"}
                value={query.data?.data.areas[0]?._count.area ?? 0}
                color="green"
                isLoading={query.isLoading}
              />
              <LocationCard
                img={query.data?.data.areas[1]?.randomImage ?? ""}
                title={query.data?.data.areas[1]?.area ?? "???"}
                value={query.data?.data.areas[1]?._count.area ?? 0}
                color="green"
                isLoading={query.isLoading}
              />
            </div>
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-1">
              <LocationCard
                img={query.data?.data.areas[2]?.randomImage ?? ""}
                title={query.data?.data.areas[2]?.area ?? "???"}
                value={query.data?.data.areas[2]?._count.area ?? 0}
                color="green"
                isLoading={query.isLoading}
              />
              <div className="lg:hidden block">
                <LocationCard
                  img={query.data?.data.areas[3]?.randomImage ?? ""}
                  title={query.data?.data.areas[3]?.area ?? "???"}
                  value={query.data?.data.areas[3]?._count.area ?? 0}
                  color="green"
                  isLoading={query.isLoading}
                />
              </div>
            </div>
          </div>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block">
              <LocationCard
                img={query.data?.data.areas[3]?.randomImage ?? ""}
                title={query.data?.data.areas[3]?.area ?? "???"}
                value={query.data?.data.areas[3]?._count.area ?? 0}
                color="green"
                isLoading={query.isLoading}
              />
            </div>
            <FiltersCard
              datas={query.data?.data.locations ?? []}
              isLoading={query.isLoading}
            />
          </div>
        </div>
        <div className="md:hidden block space-y-14 pt-18">
          <div className="relative h-[450px]">
            <LocationsSlider
              datas={[
                {
                  img: query.data?.data.areas[0]?.randomImage ?? "",
                  title: query.data?.data.areas[0]?.area ?? "???",
                  value: query.data?.data.areas[0]?._count?.area ?? 0,
                  url: locations[0].url,
                },
                {
                  img: query.data?.data.areas[1]?.randomImage ?? "",
                  title: query.data?.data.areas[1]?.area ?? "???",
                  value: query.data?.data.areas[1]?._count?.area ?? 0,
                  url: locations[1].url,
                },
                {
                  img: query.data?.data.areas[2]?.randomImage ?? "",
                  title: query.data?.data.areas[2]?.area ?? "???",
                  value: query.data?.data.areas[2]?._count?.area ?? 0,
                  url: locations[2].url,
                },
                {
                  img: query.data?.data.areas[3]?.randomImage ?? "",
                  title: query.data?.data.areas[3]?.area ?? "???",
                  value: query.data?.data.areas[3]?._count?.area ?? 0,
                  url: locations[3].url,
                },
              ]}
              isLoading={query.isLoading}
              isLight
            />
          </div>
          <FiltersCard
            datas={query.data?.data.locations ?? []}
            isLoading={query.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
