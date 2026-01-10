import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { rubik } from "@/font/font";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 aria-invalid:border-destructive rounded-md outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 font-medium text-sm whitespace-nowrap transition-all cursor-pointer [&_svg]:pointer-events-none disabled:pointer-events-none shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        search:
          "flex gap-x-1 text-white bg-(--turquoise) p-0 rounded-full w-full max-w-[128px] h-full font-medium",
        slider:
          "flex justify-center items-center bg-(--brown) shadow-neutral-400/40 shadow-xl rounded-full w-12 h-12 text-(--deep-dark)",
        pagination:
          "flex justify-center items-center bg-(--blue-light)  rounded-full w-12 h-12 text-(--deep-dark)",
        subscriber: clsx(
          "bg-(--turquoise) px-8 py-3.5 rounded-full w-[146px] h-full font-medium",
          rubik.className
        ),
        filter: clsx(
          "flex items-center bg-(--brown) shadow-neutral-400/30 shadow-xl py-3 rounded-full text-(--deep-dark) text-lg",
          rubik.className
        ),
        select: clsx(
          "flex justify-between bg-(--light) p-4 rounded-full h-[50px] font-medium text-(--deep-dark) text-sm",
          rubik.className
        ),
        close:
          "flex items-center w-[110px] gap-x-2 bg-(--light) px-6 rounded-full h-[49px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
