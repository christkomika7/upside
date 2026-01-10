import { IMAGE_TYPES, VIDEO_TYPES } from "@/lib/constant";
import Image from "next/image";
import clsx from "clsx";
import CustomVideoPlayer from "../card/custom-video-player";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type SliderMediaContainerProps = {
  media: string;
  index: number | string;
  rounded?: "sm" | "lg" | "middle";
};

export default function SliderMediaContainer({
  media,
  index,
  rounded = "sm",
}: SliderMediaContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {IMAGE_TYPES.includes(media.split(".").pop() as string) ? (
        <>
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full bg-neutral-300 rounded-none z-10" />
          )}
          <Image
            src={media}
            alt={typeof index === "number" ? "Slider-" + index : index}
            width={500}
            height={500}
            priority={true}
            unoptimized={true}
            loading="eager"
            onLoadingComplete={() => setIsLoading(false)}
            className={clsx(
              "w-full h-full object-center object-cover overflow-hidden",
              rounded === "lg"
                ? "rounded-[32px]"
                : rounded === "sm"
                  ? "rounded-lg"
                  : "rounded-t-[32px]",
            )}
          />
        </>
      ) : (
        <CustomVideoPlayer src={media} pos="bottom" rounded={rounded} />
      )}
    </>
  );
}
