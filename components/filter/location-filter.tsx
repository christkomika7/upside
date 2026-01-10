"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { housePropertiesType } from "@/data/product";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ClientPlaceType, FiltersType } from "@/lib/type";
import { filters } from "@/actions/filters";
import { useScopedI18n } from "@/locales/client";
import { createSerializer, parseAsInteger, parseAsString } from "nuqs";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import useFilterLocation from "@/stores/useFilterLocation";
import SelectFilter from "../form/select-filter";

export default function LocationFilter() {
  const status = useFilterLocation.use.type();
  const property = useFilterLocation.use.property();
  const city = useFilterLocation.use.city();
  const area = useFilterLocation.use.district();
  const setFilter = useFilterLocation.use.setFilter();
  const [cityList, setCityList] = useState<ClientPlaceType[]>([]);
  const [areaList, setAreaList] = useState<ClientPlaceType[]>([]);
  const t = useScopedI18n("filter");

  const router = useRouter();

  const serializer = createSerializer(
    {
      pageIndex: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(
        CLIENT_TOTAL_PAGINATION_PAGE as number
      ),
      city: parseAsString.withDefault(""),
      area: parseAsString.withDefault(""),
      property: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
    },
    {
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
        city: "city",
        area: "district",
        property: "property",
        status: "type",
      },
    }
  );

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  useEffect(() => {
    if (query.data?.cities) {
      setCityList([
        ...query.data.cities.map((f, index) => ({
          id: index.toString(),
          content: f.name,
        })),
      ]);
    }
  }, [query.data?.cities]);

  useEffect(() => {
    if (!city) {
      setAreaList([]);
      return;
    }
    if (city && query.data?.areas) {
      const filteredAreas = query.data.areas
        .filter((area) => area.city.toLowerCase() === city?.toLowerCase())
        .map((area, index) => ({
          id: index.toString(),
          content: area.name,
        }));
      setAreaList(filteredAreas);
    }
  }, [city, query.data?.areas]);

  useEffect(() => {
    setFilter("district", "");
  }, [city]);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!status) return;
    const url = serializer({
      pageIndex: 1,
      pageSize: CLIENT_TOTAL_PAGINATION_PAGE,
      status: status,
      property: property,
      city,
      area,
    });
    router.push(`/${status}${url}`);
  }
  return (
    <div className="bg-white/20 backdrop-blur-lg p-4 sms:p-2 rounded-[22px] sms:rounded-full w-full">
      <div className="flex sms:flex-row flex-col justify-start sms:justify-between items-start sms:items-center space-y-3 sms:space-y-0 bg-transparent sms:bg-white px-1 sms:px-2 md:px-2.5 py-4 sms:py-2 rounded-[22px] sms:rounded-full h-fit sms:h-[64px]">
        <div className="flex sms:flex-row flex-col gap-x-0.5 gap-y-2 w-full sms:w-auto h-full">
          <p
            onClick={() => setFilter("type", "buy")}
            className={clsx(
              "flex justify-center sms:justify-start items-center bg-(--light) sms:bg-transparent hover:bg-(--brown)/30 py-3 !border-none rounded-full w-full sms:w-fit h-full font-medium text-sm cursor-pointer",
              rubik.className,
              status === "buy" && "!bg-(--brown)"
            )}
          >
            <span className="px-5 border-none">{t("buy")}</span>
          </p>
          <p
            onClick={() => setFilter("type", "rent")}
            className={clsx(
              "flex justify-center sms:justify-start items-center bg-(--light) sms:bg-transparent hover:bg-(--brown)/30 py-3 border-none rounded-full w-full sms:w-fit h-full font-medium text-sm cursor-pointer",
              rubik.className,
              status === "rent" && "!bg-(--brown)"
            )}
          >
            <span className="px-5">{t("rent")}</span>
          </p>
          <SelectFilter
            placeholder={t("city")}
            items={cityList}
            value={city}
            setValue={(e) => setFilter("city", e as string)}
            className="justify-center bg-(--light) sms:bg-transparent !border-none rounded-full sms:rounded-none w-full sms:w-auto"
          />
          <SelectFilter
            placeholder={t("district")}
            items={areaList}
            value={area}
            setValue={(e) => setFilter("district", e as string)}
            className="justify-center bg-(--light) sms:bg-transparent !border-none rounded-full sms:rounded-none w-full sms:w-auto"
          />
          <SelectFilter
            placeholder={t("property")}
            items={housePropertiesType}
            value={property}
            setValue={(e) => setFilter("property", e as string)}
            type={"property"}
            className="justify-center bg-(--light) sms:bg-transparent !border-none rounded-full sms:rounded-none w-full sms:w-auto"
          />
        </div>
        <Button
          onClick={handleSubmit}
          variant="search"
          className="shadow-none max-w-full sms:max-w-[128px] h-[47px] sms:h-full"
        >
          <SearchIcon />
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
