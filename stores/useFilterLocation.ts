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


const useFilterLocation = createSelectors(create<StoreFilterProps>()(
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
                pageIndex: useFilterLocation.getState().pageIndex,
                property: useFilterLocation.getState().property,
                type: useFilterLocation.getState().type as "buy" | "rent",
                city: useFilterLocation.getState().city,
                district: useFilterLocation.getState().district,
                price: useFilterLocation.getState().price,
                bedroom: useFilterLocation.getState().bedroom,
                bathroom: useFilterLocation.getState().bathroom,
                garden: useFilterLocation.getState().garden,
                pool: useFilterLocation.getState().pool,
                furnished: useFilterLocation.getState().furnished,
                terrance: useFilterLocation.getState().terrance,
                gym: useFilterLocation.getState().gym,
                generator: useFilterLocation.getState().generator,
                filter: useFilterLocation.getState().filter,
            }
        },
        isSelectedValue(): boolean {
            const data = {
                garden: useFilterLocation.getState().garden,
                pool: useFilterLocation.getState().pool,
                furnished: useFilterLocation.getState().furnished,
                terrance: useFilterLocation.getState().terrance,
                gym: useFilterLocation.getState().gym,
                generator: useFilterLocation.getState().generator,
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



export default useFilterLocation;


