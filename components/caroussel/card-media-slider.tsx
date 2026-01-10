import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IMAGE_TYPES } from "@/lib/constant";
import Image from "next/image";

type CardMediSliderProps = {
  medias: string[];
  setMedias: Dispatch<SetStateAction<string[]>>;
  onChange: (removed: string[]) => void;
};

export default function CardMediaSlider({
  medias,
  setMedias,
  onChange,
}: CardMediSliderProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [deleted, setDeleted] = useState<string[]>([]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        setScrollPosition(scrollLeft);
      }
    };

    checkScroll();

    // Ajouter un écouteur d'événement pour vérifier lors du défilement
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      return () => scrollElement.removeEventListener("scroll", checkScroll);
    }
  }, [scrollRef]);

  const scrollLeft = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  function removeImage(e: React.SyntheticEvent, image: string) {
    e.preventDefault();
    const removed = [...deleted, ...medias.filter((m) => m === image)];
    setDeleted(removed);
    setMedias([...medias.filter((m) => m !== image)]);
    onChange(removed);
  }

  return (
    <div className="relative w-full h-full max-h-[200px] ">
      {showLeftArrow && medias.length > 2 && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-8 h-8 backdrop-blur-xl cursor-pointer flex items-center justify-center shadow-md"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {medias.length > 0 ? (
        <motion.ul
          ref={scrollRef}
          className="flex gap-x-1 w-full h-full overflow-x-auto scrollbar-hide scroll-smooth"
          initial={false}
          animate={{ x: 0 }}
          key={medias.length}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {medias.map((image, index) => (
            <div
              key={index}
              className="bg-background relative shadow-slate-400/30 shadow-sm p-2 rounded-lg min-h-[200px] !min-w-[200px] overflow-hidden"
            >
              <span
                onClick={(e) => removeImage(e, image)}
                className="w-5 h-5 rounded-full z-20 cursor-pointer flex justify-center items-center bg-white text-destructive absolute top-3 right-3"
              >
                <XIcon size={12} />
              </span>
              {IMAGE_TYPES.includes(image.split(".").pop() as string) ? (
                <Image
                  src={image}
                  alt={"Image " + index}
                  width={250}
                  height={250}
                  priority
                  className="rounded-lg w-full h-full object-center object-cover overflow-hidden"
                />
              ) : (
                <video
                  controls
                  preload="metadata"
                  className="rounded-lg w-full h-full object-center object-cover overflow-hidden"
                >
                  {image.split(".").pop() === "mp4" && (
                    <source src={image} type="video/mp4" />
                  )}
                  {image.split(".").pop() === "webm" && (
                    <source src={image} type="video/webm" />
                  )}
                  {image.split(".").pop() === "mov" && <source src={image} />}
                </video>
              )}
            </div>
          ))}
        </motion.ul>
      ) : (
        <p className="p-10 text-center text-sm text-neutral-600 bg-background shadow-slate-400/30 shadow-sm rounded-lg">
          Aucune image ou video trouvée.
        </p>
      )}

      {showRightArrow && medias.length > 2 && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-8 h-8 backdrop-blur-xl cursor-pointer flex items-center justify-center shadow-md"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
