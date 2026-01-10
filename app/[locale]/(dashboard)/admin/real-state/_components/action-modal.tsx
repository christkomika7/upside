"use client";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/modal";
import clsx from "clsx";

import { Dispatch, SetStateAction } from "react";

type ActionModalProps = {
  title: string;
  children: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  maxHeight?: string;
};

export default function ActionModal({
  children,
  title,
  action,
  setOpen,
  open,
  maxHeight,
}: ActionModalProps) {
  return (
    <ResponsiveModal onOpenChange={(e) => setOpen(e)} open={open}>
      <ResponsiveModalTrigger
        asChild
        onClick={() => setOpen(!open)}
        className="w-full"
      >
        {action}
      </ResponsiveModalTrigger>
      <ResponsiveModalContent
        className={clsx(
          "space-y-3 bg-white shadow-sm mt-2 rounded-xl w-full max-w-full sm:!max-w-md !h-fit",
          maxHeight
        )}
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="flex justify-start w-full text-zinc-600">
            {title}
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        {children}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
