"use client";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PriceFilter from "./price-filter";
import PropertyFilter from "./property-filter";
import MoreFilter from "./more-filter";
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
import useHeroFilters from "@/stores/useHeroFilters";
import FilterContainer from "./filter-container";

const filters = [
  { id: "property", state: 1, name: "Property Type" },
  { id: "price", state: 2, name: "Price Range" },
  { id: "more", state: 3, name: "+ More Criteria" },
];

type BuyFilterProps = {
  status: "buy" | "rent";
};

export default function BuyFilter({ status }: BuyFilterProps) {
  const [state, setState] = useState(0);
  const property = useHeroFilters.use.property();
  const price = useHeroFilters.use.price();
  const bedroom = useHeroFilters.use.bedroom();
  const bathroom = useHeroFilters.use.bathroom();
  const garden = useHeroFilters.use.garden();
  const pool = useHeroFilters.use.pool();
  const furnished = useHeroFilters.use.furnished();
  const generator = useHeroFilters.use.generator();
  const terrace = useHeroFilters.use.terrance();
  const gym = useHeroFilters.use.gym();
  const hasMore = useHeroFilters.use.isSelectedValue();

  const t = useScopedI18n("home.filter");
  const router = useRouter();
  const actualize = useActualize.use.setState();

  const serializer = useMemo(
    () =>
      createSerializer(
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
          garden: parseAsBoolean.withDefault(false),
          furnished: parseAsBoolean.withDefault(false),
          pool: parseAsBoolean.withDefault(false),
          generator: parseAsBoolean.withDefault(false),
          gym: parseAsBoolean.withDefault(false),
          terrace: parseAsBoolean.withDefault(false),
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
          },
        }
      ),
    []
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
      <FilterContainer
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
          {state === 1 && <PropertyFilter setState={setState} />}
          {state === 2 && <PriceFilter setState={setState} />}
          {state === 3 && <MoreFilter setState={setState} />}
        </div>
      )}
    </div>
  );
}
