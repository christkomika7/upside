import { createSelectors } from "@/lib/store";
import { FilterType } from "@/lib/type";
import { create } from "zustand/react"

type StoreFilterProps = {
    pageIndex: number;
    type: "buy" | "rent";
    property: string;
    city: string;
    district: string;
    price: string;
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
    clear: () => void;
}


const useHeroFilters = createSelectors(create<StoreFilterProps>()(
    (set) => ({
        pageIndex: 1,
        type: "buy",
        property: "",
        city: "",
        district: "",
        price: "",
        bedroom: "",
        bathroom: "",
        garden: false,
        pool: false,
        furnished: false,
        terrance: false,
        gym: false,
        generator: false,
        filter: "",
        setFilter(type, value) {
            set({ [type]: value })
        },
        getFilter(): FilterType | null {
            return {
                pageIndex: useHeroFilters.getState().pageIndex,
                property: useHeroFilters.getState().property,
                type: useHeroFilters.getState().type as "buy" | "rent",
                city: useHeroFilters.getState().city,
                district: useHeroFilters.getState().district,
                price: useHeroFilters.getState().price,
                bedroom: useHeroFilters.getState().bedroom,
                bathroom: useHeroFilters.getState().bathroom,
                garden: useHeroFilters.getState().garden,
                pool: useHeroFilters.getState().pool,
                furnished: useHeroFilters.getState().furnished,
                terrance: useHeroFilters.getState().terrance,
                gym: useHeroFilters.getState().gym,
                generator: useHeroFilters.getState().generator,
                filter: useHeroFilters.getState().filter,
            }
        },
        isSelectedValue(): boolean {
            const data = {
                garden: useHeroFilters.getState().garden,
                pool: useHeroFilters.getState().pool,
                furnished: useHeroFilters.getState().furnished,
                terrance: useHeroFilters.getState().terrance,
                gym: useHeroFilters.getState().gym,
                generator: useHeroFilters.getState().generator,
            };
            return Object.entries(data).some(v => v[1])
        },
        remove(type) {
            set({ [type]: undefined })
        },
        clear() {
            set({
                pageIndex: 1,
                type: "buy",
                property: "",
                city: "",
                district: "",
                price: "",
                bedroom: "",
                bathroom: "",
                garden: false,
                pool: false,
                furnished: false,
                terrance: false,
                gym: false,
                generator: false,
                filter: "",
            })
        },
    })
))



export default useHeroFilters;


