"use client";
import { Badge } from "../ui/badge";
import { MapPinIcon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { createSerializer, parseAsInteger, parseAsString } from "nuqs";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

type FiltersCardProps = {
  datas: {
    area: string;
  }[];
  isLoading: boolean;
};

export default function FiltersCard({ datas, isLoading }: FiltersCardProps) {
  const router = useRouter();

  const serializer = useMemo(
    () =>
      createSerializer(
        {
          pageIndex: parseAsInteger.withDefault(1),
          pageSize: parseAsInteger.withDefault(CLIENT_TOTAL_PAGINATION_PAGE),
          district: parseAsString.withDefault(""),
        },
        {
          urlKeys: {
            pageIndex: "page",
            pageSize: "pageSize",
            district: "district",
          },
        }
      ),
    []
  );

  function goTo(area: string) {
    const url = serializer({
      pageIndex: 1,
      pageSize: CLIENT_TOTAL_PAGINATION_PAGE,
      district: area.toLowerCase(),
    });
    router.push(`/rent${url}`);
  }
  return (
    <div className="flex flex-wrap justify-start items-start gap-2 h-fit">
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="bg-neutral-200 rounded-full h-11"
            style={{
              width: 80 * (i + 1),
            }}
          />
        ))}
      {!isLoading && (
        <>
          {datas.map((item, index) => (
            <Badge
              key={index}
              variant="filter"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                goTo(item.area);
              }}
            >
              <span className="flex justify-center items-center w-4 h-4">
                <MapPinIcon />
              </span>
              <span>{item.area}</span>
            </Badge>
          ))}
        </>
      )}
    </div>
  );
}
