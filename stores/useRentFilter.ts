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


const useRentFilter = createSelectors(create<StoreFilterProps>()(
    (set) => ({
        pageIndex: 1,
        type: "rent",
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
                pageIndex: useRentFilter.getState().pageIndex,
                property: useRentFilter.getState().property,
                type: useRentFilter.getState().type as "buy" | "rent",
                city: useRentFilter.getState().city,
                district: useRentFilter.getState().district,
                price: useRentFilter.getState().price,
                bedroom: useRentFilter.getState().bedroom,
                bathroom: useRentFilter.getState().bathroom,
                garden: useRentFilter.getState().garden,
                pool: useRentFilter.getState().pool,
                furnished: useRentFilter.getState().furnished,
                terrance: useRentFilter.getState().terrance,
                gym: useRentFilter.getState().gym,
                generator: useRentFilter.getState().generator,
                filter: useRentFilter.getState().filter,
            }
        },
        isSelectedValue(): boolean {
            const data = {
                garden: useRentFilter.getState().garden,
                pool: useRentFilter.getState().pool,
                furnished: useRentFilter.getState().furnished,
                terrance: useRentFilter.getState().terrance,
                gym: useRentFilter.getState().gym,
                generator: useRentFilter.getState().generator,
            };
            return Object.entries(data).some(v => v[1])
        },
        remove(type) {
            set({ [type]: undefined })
        },
        clear() {
            set({
                pageIndex: 1,
                type: "rent",
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



export default useRentFilter;


