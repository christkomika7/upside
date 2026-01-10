import React from "react";
import { cn } from "@/lib/utils";

interface PulseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const Pulse = React.forwardRef<HTMLButtonElement, PulseProps>(
  (
    {
      className,
      children,
      pulseColor = "#808080",
      duration = "1.5s",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex cursor-pointer items-center justify-center rounded-lg bg-primary p-2 text-center text-primary-foreground",
          className
        )}
        style={
          {
            "--pulse-color": pulseColor,
            "--duration": duration,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="z-10 relative">{children}</div>
        <div className="top-1/2 left-1/2 absolute bg-inherit rounded-lg size-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </button>
    );
  }
);

Pulse.displayName = "Pulse";
