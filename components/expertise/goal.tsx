import React from "react";
// import ActivityCard from "../card/activity-card";

export default function Goal() {
  return (
    <div className="relative bg-(--sand) min-h-svh">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--sand) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-[46px] min-w-fit font-semibold text-(--deep-dark) text-[30px] sm:text-[44px] text-center">
          Expertise <span className="text-(--turquoise)">Goals</span>
        </h2>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          {/* <ActivityCard className="h-[450px]" />
          <ActivityCard className="h-[450px]" /> */}
        </div>
      </div>
    </div>
  );
}
