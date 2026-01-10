import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function ReviewLoader() {
  return (
    <div className="bg-white/90 backdrop-blur-2xl px-4 py-6 rounded-[32px] w-full max-w-full md:max-w-[560px] h-full">
      <div className="flex justify-between gap-x-2 mb-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="bg-neutral-100 rounded-full w-[56px] h-[56px]" />
          <Skeleton className="bg-neutral-100 w-[156px] h-5" />
        </div>
        <Skeleton className="bg-neutral-100 w-[95px] h-4" />
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <Skeleton className="bg-neutral-100 w-4 h-4" />
        <Skeleton className="bg-neutral-100 w-[136px] h-4" />
      </div>
      <div className="space-y-1">
        <Skeleton className="bg-neutral-100 w-[76%] h-4" />
        <Skeleton className="bg-neutral-100 w-[62%] h-4" />
        <Skeleton className="bg-neutral-100 w-[43%] h-4" />
      </div>
    </div>
  );
}
