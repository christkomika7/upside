import React from "react";
// import ProcessListCard from "../card/process-list-card";

export default function Process() {
  return (
    <div className="relative bg-(--blue-light)">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--blue-light) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <h2 className="mb-8 font-semibold text-(--deep-dark) text-[30px] sm:text-[56px] text-center">
          Expertise <span className="text-(--turquoise)">Process</span>
        </h2>

        <div className="space-y-4 mx-auto max-w-[855px]">
          {/* <ProcessListCard />
          <ProcessListCard />
          <ProcessListCard /> */}
        </div>
      </div>
    </div>
  );
}
