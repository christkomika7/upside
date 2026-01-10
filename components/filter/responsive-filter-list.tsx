import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { useScopedI18n } from "@/locales/client";
import { FilterIdType } from "@/lib/type";

type FilterItem = {
  id: string;
  state: number;
  name: string;
};

type Props = {
  filters: FilterItem[];
  state: number;
  property: string;
  price: string;
  hasMore: boolean;
  handleState: (index: number) => void;
};

export default function ResponsiveFilterList({
  filters,
  state,
  property,
  price,
  hasMore,
  handleState,
}: Props) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState<FilterItem[]>(filters);
  const [overflowItems, setOverflowItems] = useState<FilterItem[]>([]);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const t = useScopedI18n("home.filter");

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const container = containerRef.current;
      if (!container) return;

      const children = Array.from(container.children) as HTMLElement[];

      let total = 0;
      let visible: FilterItem[] = [];
      let overflow: FilterItem[] = [];

      for (let i = 0; i < filters.length; i++) {
        const child = children[i];
        total += child.offsetWidth;
        if (total < container.offsetWidth - 50) {
          visible.push(filters[i]);
        } else {
          overflow.push(filters[i]);
        }
      }

      setVisibleItems(visible);
      setOverflowItems(overflow);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [filters]);

  const handleMoreClick = () => {
    setShowOverflowMenu(!showOverflowMenu);
  };

  return (
    <ul
      ref={containerRef}
      className="flex flex-wrap md:flex-nowrap gap-2 bg-white/20 backdrop-blur-2xl rounded-full w-full h-full overflow-hidden"
    >
      {/* Visible filter items */}
      <div id="filter-visible-items" className="flex flex-wrap gap-2">
        {visibleItems.map((f) => (
          <li
            key={f.id}
            onClick={() => handleState(f.state)}
            className={clsx(
              "flex justify-center md:justify-start items-center hover:bg-(--brown)/20 backdrop-blur-2xl px-2 sm:px-6 border-neutral-300 md:border-r border-none rounded-full h-[50px] sm:h-full font-medium text-sm md:text-left text-center whitespace-nowrap cursor-pointer",
              rubik.className,
              state === f.state && "!bg-(--brown)/40",
              f.id === "property" && property && "!bg-(--brown)",
              f.id === "price" && price && "!bg-(--brown)",
              f.id === "more" && hasMore && "!bg-(--brown)"
            )}
          >
            {f.id === "property" && property
              ? property
              : f.id === "price" && price
                ? price + " FCFA"
                : t(f.id as FilterIdType)}
          </li>
        ))}
      </div>

      {/* Overflow items and More button */}
      {overflowItems.length > 0 && (
        <div className="relative flex justify-center items-center">
          <MoreHorizontal
            onClick={handleMoreClick}
            className="cursor-pointer"
          />
          {showOverflowMenu && (
            <div className="top-full left-0 z-10 absolute bg-white shadow-lg mt-2 p-2 rounded-lg">
              <ul className="space-y-2">
                {overflowItems.map((f) => (
                  <li
                    key={f.id}
                    onClick={() => handleState(f.state)}
                    className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  >
                    {t(f.id as FilterIdType)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </ul>
  );
}
