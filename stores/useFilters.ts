import { createSelectors } from "@/lib/store";
import { FilterType } from "@/lib/type";
import { create } from "zustand/react";

type StoreFilterProps = {
  pageIndex: number;
  type: "buy" | "rent" | "";
  property: string;
  city: string;
  district: string;
  price: string;
  view: string;
  bedroom: string;
  bathroom: string;
  garden: boolean;
  pool: boolean;
  furnished: boolean;
  terrance: boolean;
  gym: boolean;
  generator: boolean;
  filter: string;
  isSelectedValue: () => boolean;
  setFilter: (type: keyof FilterType, value: any) => void;
  getFilter: () => FilterType | null;
  remove: (type: keyof FilterType) => void;
  hasData: () => boolean;
  clear: () => void;
};

const useFilters = createSelectors(
  create<StoreFilterProps>()((set) => ({
    pageIndex: 1,
    type: "",
    property: "",
    city: "",
    district: "",
    price: "",
    bedroom: "",
    bathroom: "",
    view: "",
    garden: false,
    furnished: false,
    pool: false,
    terrance: false,
    gym: false,
    generator: false,
    filter: "",
    setFilter(type, value) {
      set({ [type]: value });
    },
    getFilter(): FilterType | null {
      return {
        pageIndex: useFilters.getState().pageIndex,
        property: useFilters.getState().property,
        type: useFilters.getState().type as "buy" | "rent",
        city: useFilters.getState().city,
        district: useFilters.getState().district,
        price: useFilters.getState().price,
        bedroom: useFilters.getState().bedroom,
        bathroom: useFilters.getState().bathroom,
        garden: useFilters.getState().garden,
        pool: useFilters.getState().pool,
        view: useFilters.getState().view,
        furnished: useFilters.getState().furnished,
        terrance: useFilters.getState().terrance,
        gym: useFilters.getState().gym,
        generator: useFilters.getState().generator,
        filter: useFilters.getState().filter,
      };
    },
    hasData() {
      const datas = useFilters.getState().getFilter() as FilterType;
      return Object.entries({ ...datas, pageIndex: "" }).some((v) => v[1]);
    },
    isSelectedValue(): boolean {
      const data = {
        garden: useFilters.getState().garden,
        pool: useFilters.getState().pool,
        furnished: useFilters.getState().furnished,
        terrance: useFilters.getState().terrance,
        gym: useFilters.getState().gym,
        generator: useFilters.getState().generator,
        view: useFilters.getState().view,
      };
      return Object.entries(data).some((v) => v[1]);
    },
    remove(type) {
      set({ [type]: undefined });
    },
    clear() {
      set({
        pageIndex: 1,
        type: "",
        property: "",
        city: "",
        district: "",
        price: "",
        bedroom: "",
        bathroom: "",
        view: "",
        garden: false,
        pool: false,
        furnished: false,
        terrance: false,
        gym: false,
        generator: false,
        filter: "",
      });
    },
  })),
);

export default useFilters;
