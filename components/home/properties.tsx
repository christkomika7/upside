"use client";
import { useScopedI18n } from "@/locales/client";
import PropertyCard from "../card/property-card";
import PropertiesSlider from "../caroussel/properties-slider";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RealStateType, RequestResponse } from "@/lib/type";
import { disponibilitiesHouse } from "@/actions/realstate";
import { Skeleton } from "../ui/skeleton";
import { HousePropertiesType } from "@/data";

export default function Properties() {
  const t = useScopedI18n("properties");

  const query: UseQueryResult<RequestResponse<RealStateType[]>, Error> = useQuery({
    queryKey: ["disponibility"],
    queryFn: disponibilitiesHouse,
  });

  const firstProperty = query.data?.data && Array.isArray(query.data?.data) ? query.data?.data[0] : null;
  const secondProperty = query.data?.data && Array.isArray(query.data?.data) ? query.data?.data[1] : null;

  const createPropertyData = (
    property: any
  ): HousePropertiesType | undefined => {
    console.log("Property", property,);
    if (!property) return undefined;

    const status: "Acheter" | "Louer" =
      property.status === "Louer" ? "Louer" : "Acheter";

    return {
      id: property.id,
      status,
      price: property.price,
      location: `${property.city || ""}, ${property.area || ""}`
        .trim()
        .replace(/^,\s*|,\s*$/g, ""),
      size: property.dimension,
      bed: property.bedroom,
      bath: property.bathroom,
      room: property.room,
      furnished: property.furnished,
    };
  };

  return (
    <div className="relative bg-(--sand)">
      <div className="-top-8.75 left-0 z-10 absolute bg-(--sand) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-285">
        <h2 className="mb-9 md:mb-12 font-semibold text-(--deep-dark) text-[30px] sm:text-[44px] text-center">
          {t("title.left")}{" "}
          <span className="text-(--turquoise)">{t("title.right")}</span>
        </h2>

        {/* Version Desktop Large */}
        <div className="hidden gap-4 lg:grid grid-cols-2 h-135">
          {query.isLoading && (
            <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
          )}
          {!query.isLoading && firstProperty && (
            <PropertyCard
              image={
                firstProperty.images?.[0] ?? "/assets/home/properties/large.png"
              }
              data={createPropertyData(firstProperty)}
            />
          )}
          {!query.isLoading && !firstProperty && (
            <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
              <p className="text-neutral-500">Aucune propriété disponible</p>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <div className="flex-1 h-full max-h-1/2">
              {query.isLoading && (
                <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
              )}
              {!query.isLoading && secondProperty && (
                <PropertyCard data={createPropertyData(secondProperty)} />
              )}
              {!query.isLoading && !secondProperty && (
                <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
                  <p className="text-neutral-500">
                    Aucune propriété disponible
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 gap-4 grid grid-cols-2 h-full max-h-1/2">
              {query.isLoading && (
                <>
                  <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
                  <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
                </>
              )}
              {!query.isLoading && secondProperty && (
                <>
                  <PropertyCard
                    justImage
                    image={
                      secondProperty.images?.[0] ??
                      "/assets/home/properties/Subtract 1.png"
                    }
                  />
                  <PropertyCard
                    justImage
                    image={
                      secondProperty.images?.[1] ??
                      "/assets/home/properties/Subtract 2.png"
                    }
                  />
                </>
              )}
              {!query.isLoading && !secondProperty && (
                <>
                  <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
                    <p className="text-neutral-500">
                      Aucune propriété disponible
                    </p>
                  </div>
                  <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
                    <p className="text-neutral-500">
                      Aucune propriété disponible
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Version Tablet */}
        <div className="hidden lg:hidden md:block space-y-4">
          <div className="gap-4 grid grid-cols-[1.5fr_1.2fr] h-95">
            {query.isLoading && (
              <>
                <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
                <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
              </>
            )}

            {!query.isLoading && firstProperty && (
              <PropertyCard
                image={
                  firstProperty.images?.[0] ??
                  "/assets/home/properties/large.png"
                }
                data={createPropertyData(firstProperty)}
              />
            )}
            {!query.isLoading && !firstProperty && (
              <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
                <p className="text-neutral-500">Aucune propriété disponible</p>
              </div>
            )}

            {!query.isLoading && secondProperty && (
              <PropertyCard data={createPropertyData(secondProperty)} />
            )}
            {!query.isLoading && !secondProperty && (
              <div className="flex justify-center items-center bg-neutral-100 rounded-4xl w-full h-full">
                <p className="text-neutral-500">Aucune propriété disponible</p>
              </div>
            )}
          </div>

          <div className="gap-4 grid grid-cols-2 h-95">
            {query.isLoading && (
              <>
                <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
                <Skeleton className="bg-neutral-200 rounded-4xl w-full h-full" />
              </>
            )}

            {!query.isLoading && secondProperty && (
              <>
                <PropertyCard
                  justImage
                  image={
                    secondProperty.images?.[0] ??
                    "/assets/home/properties/Subtract 1.png"
                  }
                />
                <PropertyCard
                  justImage
                  image={
                    secondProperty.images?.[1] ??
                    "/assets/home/properties/Subtract 2.png"
                  }
                />
              </>
            )}
            {!query.isLoading && !secondProperty && (
              <>
                <div className="bg-neutral-100 rounded-4xl w-full h-full"></div>
                <div className="bg-neutral-100 rounded-4xl w-full h-full"></div>
              </>
            )}
          </div>
        </div>

        {/* Version Mobile */}
        <div className="md:hidden block relative pt-18 h-112.5">
          <PropertiesSlider
            isLoading={query.isLoading}
            first={{
              image:
                firstProperty?.images?.[0] ??
                "/assets/home/properties/large.png",
              data: createPropertyData(firstProperty),
            }}
            second={{
              image:
                secondProperty?.images?.[0] ??
                "/assets/home/properties/Subtract 1.png",
            }}
            third={{
              image:
                secondProperty?.images?.[1] ??
                "/assets/home/properties/Subtract 2.png",
            }}
            unique={{
              data: createPropertyData(secondProperty),
            }}
          />
        </div>
      </div>
    </div>
  );
}
