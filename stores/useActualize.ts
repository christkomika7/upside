import { createSelectors } from "@/lib/store";
import { create } from "zustand/react"

type ActualizeProps = {
    state: number;
    setState: (state: number) => void;
}

const useActualize = createSelectors(create<ActualizeProps>()(
    (set) => ({
        state: 0,
        setState(state) {
            set({ state })
        },
    }),
))

export default useActualize;


