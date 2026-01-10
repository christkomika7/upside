import React from "react";

export default function ProcessListCard() {
  return (
    <>
      <div className="hidden items-center gap-x-3 sm:grid grid-cols-[50px_1fr_40px] bg-(--light) shadow-neutral-400/30 shadow-xl px-5 py-3 border-2 border-white rounded-[32px]">
        <span className="flex justify-center items-center bg-amber-200 rounded-full w-[50px] h-[50px]"></span>
        <p className="font-semibold text-(--deep-dark) text-xl">
          Initial contact and appointment scheduling
        </p>
        <span className="flex justify-center items-center bg-amber-200 rounded-full w-[40px] h-[40px]"></span>
      </div>
      <div className="sm:hidden block bg-(--light) shadow-neutral-400/30 shadow-xl px-5 py-3 border-2 border-white rounded-[32px]">
        <div className="flex justify-between items-center mb-2.5">
          <span className="flex justify-center items-center bg-amber-200 rounded-full w-[50px] h-[50px]"></span>
          <span className="flex justify-center items-center bg-amber-200 rounded-full w-[40px] h-[40px]"></span>
        </div>
        <p className="font-semibold text-(--deep-dark) text-xl">
          Initial contact and appointment scheduling
        </p>
      </div>
    </>
  );
}
