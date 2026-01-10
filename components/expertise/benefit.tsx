// import ServiceCard from "../card/service-card";

export default function Benefit() {
  return (
    <div className="relative bg-(--dark-green) min-h-svh">
      <div className="-top-[55px] left-0 z-10 absolute bg-(--dark-green) rounded-t-[64px] w-full h-14"></div>
      <div className="mx-auto px-2 pt-4 pb-44 max-w-[1140px]">
        <div className="flex justify-center items-center gap-x-12 mb-[54px]">
          <h2 className="min-w-fit font-semibold text-(--blue-light) text-[30px] sm:text-[44px] text-center">
            <span className="text-(--bright-green)">Benefits</span> for Owners
          </h2>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* <ServiceCard className="!h-[350px]" />
          <ServiceCard className="!h-[350px]" />
          <ServiceCard className="!h-[350px]" /> */}
        </div>
      </div>
    </div>
  );
}
