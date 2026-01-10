import ActionModal from "@/app/[locale]/(dashboard)/admin/real-state/_components/action-modal";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { EditIcon } from "lucide-react";

import React, { useState } from "react";

type InfoCardProps = {
  title: string;
  content: string;
  pre?: boolean;
};

export default function InfoCard({
  title,
  content,
  pre = false,
}: InfoCardProps) {
  return (
    <div className="-space-y-1 bg-background p-4 rounded-lg overflow-hidden">
      <h2 className={clsx("font-medium text-neutral-600", rubik.className)}>
        {title}
      </h2>
      {pre && (
        <pre
          className={clsx(
            "text-sm whitespace-pre-wrap break-words",
            rubik.className,
          )}
        >
          {content}
        </pre>
      )}
      {!pre && (
        <p className={clsx("text-neutral-500 text-sm", rubik.className)}>
          {content}
        </p>
      )}
    </div>
  );
}
