import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  children: React.ReactNode;
  value: string;
  message: string;
  error: string;
};

export default function CopyButton({
  children,
  value,
  message,
  error,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success(message);
      setOpen(false);
    } catch (e) {
      toast.success(error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="cursor-pointer pointer-events-auto">
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="z-[3000] items-center gap-x-2 grid grid-cols-[1fr_16px] bg-white shadow mt-6 px-3 py-2 border rounded-md w-fit max-w-xs text-center"
      >
        <p className="mx-auto max-w-[200px] overflow-hidden text-neutral-600 text-sm truncate whitespace-nowrap">
          {value}
        </p>
        <div
          onClick={handleCopy}
          className="flex justify-center items-center gap-2 font-medium text-green-600 text-sm cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
