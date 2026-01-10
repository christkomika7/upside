"use client";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useScopedI18n } from "@/locales/client";
import { FilterIdType } from "@/lib/type";
import {
  createSerializer,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import useActualize from "@/stores/useActualize";
import useRentFilter from "@/stores/useRentFilter";
import RentPropertyFilter from "./rent-property-filter";
import RentMoreFilter from "./rent-more-filter";
import RentPriceFilter from "./rent-price-filter";
import RentFilterContainer from "./rent-filter-container";

type RentFilterProps = {
  status: "buy" | "rent";
};

export default function RentFilter({ status }: RentFilterProps) {
  const [state, setState] = useState(0);
  const property = useRentFilter.use.property();
  const price = useRentFilter.use.price();
  const bedroom = useRentFilter.use.bedroom();
  const bathroom = useRentFilter.use.bathroom();
  const garden = useRentFilter.use.garden();
  const pool = useRentFilter.use.pool();
  const furnished = useRentFilter.use.furnished();
  const generator = useRentFilter.use.generator();
  const terrace = useRentFilter.use.terrance();
  const gym = useRentFilter.use.gym();
  const hasMore = useRentFilter.use.isSelectedValue();

  const t = useScopedI18n("home.filter");
  const router = useRouter();
  const actualize = useActualize.use.setState();

  const serializer = createSerializer(
    {
      pageIndex: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(CLIENT_TOTAL_PAGINATION_PAGE),
      city: parseAsString.withDefault(""),
      area: parseAsString.withDefault(""),
      property: parseAsString.withDefault(""),
      bedroom: parseAsString.withDefault(""),
      bathroom: parseAsString.withDefault(""),
      price: parseAsString.withDefault(""),
      filter: parseAsString.withDefault(""),
      garden: parseAsBoolean,
      furnished: parseAsBoolean,
      pool: parseAsBoolean,
      generator: parseAsBoolean,
      gym: parseAsBoolean,
      terrace: parseAsBoolean,
      active: parseAsInteger.withDefault(0),
    },
    {
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
        city: "city",
        area: "district",
        property: "property",
        bedroom: "bedroom",
        bathroom: "bathroom",
        price: "price",
        garden: "garden",
        furnished: "furnished",
        pool: "pool",
        generator: "generator",
        gym: "gym",
        terrace: "terrace",
        active: "active",
      },
    }
  );

  useEffect(() => {
    actualize(state);
  }, [state]);

  const handleState = (index: number) => {
    if (index < 1 || index > 3) return;
    setState((prev) => (prev === index ? 0 : index));
  };

  const handleSubmit = () => {
    if (!status) return;
    const url = serializer({
      pageIndex: 1,
      pageSize: CLIENT_TOTAL_PAGINATION_PAGE,
      property: property,
      price: price === "Sans prix" ? "noprice" : price,
      bedroom: bedroom,
      bathroom: bathroom,
      garden: garden,
      furnished: furnished,
      pool: pool,
      generator: generator,
      gym: gym,
      terrace: terrace,
    });
    router.push(`/${status}${url}`);
  };

  return (
    <div className="space-y-3">
      <RentFilterContainer
        action={
          <Button
            onClick={handleSubmit}
            variant="search"
            className="shadow-none md:shadow-lg max-w-full md:max-w-[128px] h-[62px] md:h-full"
          >
            <SearchIcon />
            {t("search")}
          </Button>
        }
        filters={filters}
        handleState={handleState}
        state={state}
        hasMore={hasMore}
        property={property}
        price={price}
      />
      {state > 0 && (
        <div className="bg-white rounded-[32px] w-full overflow-hidden">
          {state === 1 && <RentPropertyFilter setState={setState} />}
          {state === 2 && <RentPriceFilter setState={setState} />}
          {state === 3 && <RentMoreFilter setState={setState} />}
        </div>
      )}
    </div>
  );
}

const filters = [
  { id: "property", state: 1, name: "Property Type" },
  { id: "price", state: 2, name: "Price Range" },
  { id: "more", state: 3, name: "+ More Criteria" },
];
