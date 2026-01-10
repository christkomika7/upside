import { ChevronUpIcon } from "lucide-react";
import useScroll from "../hooks/useScroll";
import clsx from "clsx";

export default function UpTo() {
  const scroll = useScroll();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "right-6 z-50 fixed flex justify-center items-center bg-(--brown) shadow-lg shadow-neutral-600/30 rounded-full w-12 h-12 transition-all duration-500 cursor-pointer",
        scroll < 2100 ? "bottom-24 opacity-0" : "bottom-28 opacity-100"
      )}
    >
      <span className="w-6 h-6">
        <ChevronUpIcon />
      </span>
    </button>
  );
}
