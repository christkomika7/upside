"use client";
import useImage from "@/stores/useImage";
import { XIcon } from "lucide-react";
import ViewImageSlider from "./view-image-slider";

type ViewImageProps = {
  rounded?: "sm" | "lg";
};

export default function ViewImage({ rounded = "lg" }: ViewImageProps) {
  const show = useImage.use.show();
  const images = useImage.use.images();
  const setShow = useImage.use.setShow();
  const position = useImage.use.position();

  return (
    <>
      {show && (
        <div className="top-0 left-0 z-[10000] fixed bg-black/20 backdrop-blur-lg w-full h-full">
          <div className="relative flex justify-center items-center w-full h-full">
            <div className="p-2 w-full h-full">
              <ViewImageSlider
                images={images}
                initial={position}
                rounded={rounded}
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShow(false);
              }}
              className="top-8 right-8 absolute flex justify-center items-center bg-(--light) rounded-full w-6 h-6 text-(--deep-dark) cursor-pointer pointer-events-auto"
            >
              <XIcon size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
