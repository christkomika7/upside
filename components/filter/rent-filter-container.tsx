import { rubik } from "@/font/font";
import { FilterIdType, FilterType, PropertiesNameType } from "@/lib/type";
import { useScopedI18n } from "@/locales/client";
import useHeroFilters from "@/stores/useHeroFilters";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import useRentFilter from "@/stores/useRentFilter";

type RentFilterContainerProps = {
  action: React.ReactNode;
  filters: {
    id: string;
    state: number;
    name: string;
  }[];
  handleState: (index: number) => void;
  state: number;
  hasMore: () => boolean;
  property: string;
  price: string;
};

export default function RentFilterContainer({
  action,
  filters,
  handleState,
  state,
  hasMore,
  price,
  property,
}: RentFilterContainerProps) {
  const t = useScopedI18n("home.filter");
  const setFilter = useRentFilter.use.setFilter();
  const bed = useRentFilter.use.bedroom();
  const bath = useRentFilter.use.bathroom();
  const garden = useRentFilter.use.garden();
  const pool = useRentFilter.use.pool();
  const furnished = useRentFilter.use.furnished();
  const terrace = useRentFilter.use.terrance();
  const gym = useRentFilter.use.gym();
  const generator = useRentFilter.use.generator();

  const scrollRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  function deleteData(type: keyof FilterType) {
    setFilter(type, "");
  }

  // Vérifier si le défilement est nécessaire
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
  }, [
    scrollRef,
    bed,
    bath,
    garden,
    pool,
    furnished,
    terrace,
    gym,
    generator,
    property,
    price,
  ]);

  // Fonctions pour faire défiler la liste
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Compter les filtres actifs pour détecter les changements
  const activeFiltersCount = [
    property,
    price,
    bed,
    bath,
    garden,
    pool,
    furnished,
    terrace,
    gym,
    generator,
  ].filter(Boolean).length;

  return (
    <div className="gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-[1fr_130px] bg-white/20 backdrop-blur-2xl md:bg-white p-4 md:p-2 rounded-[32px] md:rounded-full w-full h-fit md:h-16 relative">
      <div className="relative w-full h-full overflow-hidden">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-6 h-6 backdrop-blur-xl cursor-pointer flex items-center justify-center shadow-md"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <motion.ul
          ref={scrollRef}
          className="flex md:flex-row flex-col gap-x-1 gap-y-2 rounded-none  md:rounded-full w-full h-fit md:h-full overflow-x-auto scrollbar-hide scroll-smooth"
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          key={activeFiltersCount} // Force re-render on filter changes
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <li
            onClick={() => handleState(filters[0].state)}
            className={clsx(
              "flex justify-center items-center bg-white md:bg-transparent gap-x-2 hover:bg-(--brown)/20 backdrop-blur-2xl px-5 py-5 md:py-0 border-neutral-300 rounded-full h-fit md:h-full font-medium text-sm text-left cursor-pointer shrink-0",
              rubik.className,
              state === filters[0].state && "!bg-(--brown)/40",
              property && "!bg-(--brown)",
            )}
          >
            {property && property !== t(filters[0].id as FilterIdType)
              ? t(
                  property
                    .toLowerCase()
                    .replaceAll(" ", "") as PropertiesNameType,
                )
              : `${t(filters[0].id as FilterIdType)}`}

            {property && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("property");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            )}
          </li>
          <li
            onClick={() => handleState(filters[1].state)}
            className={clsx(
              "flex justify-center items-center bg-white md:bg-transparent gap-x-2 hover:bg-(--brown)/20 backdrop-blur-2xl px-5 py-5 md:py-0 border-neutral-300 rounded-full h-fit md:h-full font-medium text-sm text-left cursor-pointer shrink-0",
              rubik.className,
              state === filters[1].state && "!bg-(--brown)/40",
              price && "!bg-(--brown)",
            )}
          >
            {price && price !== t(filters[1].id as FilterIdType)
              ? price + " XAF"
              : `${t(filters[1].id as FilterIdType)}`}

            {price && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("price");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            )}
          </li>
          {bed && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {bed} {t("bedroom")}
              {Number(bed) > 1 ? "s" : ""}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("bedroom");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {bath && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {bath} {t("bathroom")}
              {Number(bath) > 1 ? "s" : ""}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("bathroom");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {garden && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("garden")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("garden");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {pool && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("pool")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("pool");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {furnished && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("furnished")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("furnished");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {terrace && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("terrace")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("terrance");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {gym && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("gym")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("gym");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          {generator && (
            <motion.li
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "md:flex hidden justify-center items-center gap-x-2 !bg-(--brown) hover:bg-(--brown)/20 backdrop-blur-2xl px-5 border-neutral-300 rounded-full h-full font-medium text-sm text-left cursor-pointer shrink-0",
                rubik.className,
              )}
            >
              {t("generator")}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteData("generator");
                }}
                className="flex justify-center items-center bg-white/30 rounded-full w-4 h-4"
              >
                <XIcon size={12} />
              </span>
            </motion.li>
          )}
          <li
            onClick={() => handleState(filters[2].state)}
            className={clsx(
              "flex justify-center items-center bg-white md:bg-transparent gap-x-2 hover:bg-(--brown)/20 backdrop-blur-2xl px-5 py-5 md:py-0 border-neutral-300 rounded-full h-fit md:h-full font-medium text-sm text-left cursor-pointer shrink-0",
              rubik.className,
              state === filters[2].state && "!bg-(--brown)/40",
              hasMore() && "!bg-(--brown)",
            )}
          >
            {t(filters[2].id as FilterIdType)}
          </li>
        </motion.ul>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full w-6 h-6 backdrop-blur-xl cursor-pointer flex items-center justify-center shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      {action}
    </div>
  );
}
