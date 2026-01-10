"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "../ui/modal";
import { RealStateType } from "@/lib/type";
import { useWidth } from "@/hooks/useWidth";
import { useScopedI18n } from "@/locales/client";
import GoogleMapview from "../google-mapview";

type MapModalProps = {
  children: React.ReactNode;
  datas: RealStateType[];
};

export default function MapModal({ children, datas }: MapModalProps) {
  const [open, setOpen] = useState(false);
  const width = useWidth();
  const ta = useScopedI18n("action");

  useEffect(() => {
    if (width < 640) {
      setOpen(false);
    }
  }, [width]);

  return (
    <ResponsiveModal open={open} onOpenChange={(e) => setOpen(e)}>
      <ResponsiveModalTrigger asChild>{children}</ResponsiveModalTrigger>
      <ResponsiveModalContent
        hasIcon={false}
        className="!gap-0 !space-y-0 grid grid-cols-1 bg-transparent !shadow-none px-0 sm:px-2 py-2 !border-none focus-within:border-none rounded-none outline-0 focus-within:ring-0 !w-full !max-w-[1146px] !h-svh"
      >
        <div className="relative flex flex-col rounded-b-none sm:rounded-b-[32px] h-full">
          <div className="hidden sm:flex flex-col items-end w-full h-11">
            <Button
              onClick={() => setOpen(false)}
              variant="close"
              className="bg-white !px-1 border-none h-9"
            >
              <XIcon size={15} /> {ta("close")}
            </Button>
          </div>
          <div className="flex-1 bg-(--light) shadow-neutral-400/30 rounded-t-[32px] rounded-b-none sm:rounded-b-[32px] w-full">
            <ResponsiveModalTitle />
            <ResponsiveModalDescription />
            <div className="flex flex-col justify-center items-center bg-(--light) shadow-neutral-400/30 shadow-xl p-1 rounded-[32px] w-full h-full">
              <GoogleMapview
                value={
                  datas
                    ? datas.map((d) => ({
                        title: d.title,
                        image: d.images[0],
                        lat: Number(d.position[0]),
                        lng: Number(d.position[1]),
                      }))
                    : []
                }
                rounded={32}
              />
            </div>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
