import { createSelectors } from "@/lib/store";
import { create } from "zustand/react"

type StoreFilterProps = {
    state: boolean;
    setState: (state: boolean) => void;
    toggle: () => void;
}

const usePanel = createSelectors(create<StoreFilterProps>()(
    (set) => ({
        state: false,
        setState(state) {
            set({ state })
        },
        toggle() {
            set({ state: !usePanel.getState().state })
        },
    }),
))

export default usePanel;


