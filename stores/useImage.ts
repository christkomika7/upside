import { createSelectors } from "@/lib/store";
import { create } from "zustand/react"

type ImageProps = {
    show: boolean;
    images: {
        title: string;
        url: string;
    }[] | [];
    position: number;
    setPosition: (position: number) => void;
    setImages: (images: { title: string; url: string; }[]) => void;
    setShow: (state: boolean) => void;
}

const useImage = createSelectors(create<ImageProps>()(
    (set) => ({
        show: false,
        images: [],
        position: 0,
        setImages(images) {
            set({ images })
        },
        setPosition(position) {
            set({ position })
        },
        setShow(state) {
            set({ show: state })
        },
    }),
))

export default useImage;


