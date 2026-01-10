import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function HouseCardLoader() {
  return (
    <div className="bg-(--light) shadow-neutral-400/30 shadow-xl rounded-[32px] overflow-hidden">
      <div className="relative pt-2.5 w-full h-[270px] md:h-[348px]">
        <Skeleton className="bg-neutral-200 w-full h-full" />
      </div>
      <div className="space-y-3 p-4 md:p-9">
        <Skeleton className="bg-neutral-200 rounded-full w-[55%] h-5" />
        <div className="space-y-0.5">
          <Skeleton className="bg-neutral-200 rounded-full w-[30%] h-3" />
          <Skeleton className="bg-neutral-200 rounded-full w-[38%] h-3" />
          <Skeleton className="bg-neutral-200 rounded-full w-[43%] h-3" />
          <Skeleton className="bg-neutral-200 rounded-full w-[40%] h-3" />
        </div>

        <div className="flex md:flex-row flex-col justify-start md:justify-between items-start md:items-center gap-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className="bg-neutral-200 rounded-full w-[35%] h-5" />
            <div className="flex items-center gap-x-1.5 text-(--deep-dark) text-sm">
              <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
              <Skeleton className="bg-neutral-200 rounded-full w-[180px] h-5" />
            </div>
          </div>
          <div className="sm:flex items-center gap-x-2 grid grid-cols-[1fr_40px] w-full sm:w-fit">
            <Skeleton className="bg-neutral-200 rounded-full w-[150px] h-9" />
            <Skeleton className="bg-neutral-200 rounded-full w-9 h-9" />
          </div>
        </div>
        <Skeleton className="bg-neutral-200 rounded-xl w-full h-8" />
        <div className="flex justify-end items-center gap-x-3">
          <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
          <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
          <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
          <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
