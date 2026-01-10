import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function CardLoader() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="shadow-neutral-400/15 shadow-xl rounded-[32px] overflow-hidden"
        >
          <div className="relative w-full h-[358px]">
            <div className="top-0 left-0 z-30 absolute p-3 w-full h-full pointer-events-none">
              <Skeleton className="bg-neutral-300 rounded-full w-22 h-9" />
            </div>
            <Skeleton className="bg-neutral-200 w-full h-[358px] rounded-none" />
          </div>
          <div className="bg-white shadow-neutral-400/30 shadow-xl px-3 py-7">
            <div className="flex justify-between items-center mb-3">
              <Skeleton className="bg-neutral-200 rounded-full w-[70%] h-5" />

              <div className="hidden lg:block rounded-full w-[35px] h-[35px]">
                <Skeleton className="bg-neutral-200 rounded-full w-[35px] h-[35px]" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <Skeleton className="bg-neutral-200 rounded-full w-[40%] h-5" />

              <Skeleton className="bg-neutral-200 rounded-full w-[120px] h-9" />
            </div>

            <div className="flex justify-between items-center mb-3">
              <ul className="flex justify-between lg:justify-start items-center gap-x-2 w-full lg:w-fit">
                <li className="flex items-center gap-x-1.5">
                  <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                  <Skeleton className="bg-neutral-200 rounded-full w-10 h-5" />
                </li>
                <li className="flex items-center gap-x-1">
                  <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                  <Skeleton className="bg-neutral-200 rounded-full w-10 h-5" />
                </li>
                <li className="flex items-center gap-x-1">
                  <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                  <Skeleton className="bg-neutral-200 rounded-full w-10 h-5" />
                </li>
              </ul>
              <ul className="hidden lg:flex items-center gap-x-4">
                <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
                <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
              </ul>
            </div>
            <div className="lg:hidden justify-between items-center gap-x-2 grid grid-cols-[1fr_40px] mb-3 pb-2">
              <Skeleton className="bg-neutral-200 rounded-full w-[120px] h-9" />
              <div className="hidden lg:block rounded-full w-[35px] h-[35px]">
                <Skeleton className="bg-neutral-200 rounded-full w-[35px] h-[35px]" />
              </div>
            </div>
            <ul className="lg:hidden flex justify-between items-center gap-x-3 w-full">
              <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
              <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
              <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
              <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
