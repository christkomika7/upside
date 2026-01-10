"use client";
import { Button } from "@/components/ui/button";
import { OptionType } from "@/lib/type";
import { limiteName } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import v from "voca";
import DeleteOption from "./delete-option";
import Image from "next/image";
import { ReactSVG } from "react-svg";
import UpdateOption from "./update-option";

// <ReactSVG
//   src={icon}
//   beforeInjection={(svg) => {
//     svg.setAttribute("width", "24");
//     svg.setAttribute("height", "24");
//   }}
// />

export const columns: ColumnDef<OptionType>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
        </Button>
      );
    },
    cell: ({ row }) => {
      const index = row.index;
      return <div className="flex justify-center text-sm">{index + 1}</div>;
    },
  },
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Icône
        </Button>
      );
    },
    cell: ({ row }) => {
      const { icon, name } = row.original;
      console.log({ icon });
      return (
        <div className="flex justify-center items-center">
          {icon && icon.endsWith(".svg") && (
            // <ReactSVG
            //   src={icon}
            //   title={name}
            //   useRequestCache={false}
            //   beforeInjection={(svg) => {
            //     svg.setAttribute("width", "24");
            //     svg.setAttribute("height", "24");
            //   }}
            // />
            <Image src={icon} alt={name} width={24} height={24} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex justify-center text-sm">
          {v.titleCase(limiteName(name))}
        </div>
      );
    },
  },
  {
    accessorKey: "translate",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Traduction
        </Button>
      );
    },
    cell: ({ row }) => {
      const translate = row.original.translate;
      return (
        <div className="flex justify-center text-sm">
          {v.titleCase(limiteName(translate ?? ""))}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
        </Button>
      );
    },
    cell: ({ row }) => {
      const { id, icon, name, translate } = row.original;
      return (
        <div className="flex justify-center items-center gap-x-1">
          {/* <UpdateOption id={id} icon={icon} name={name} translate={translate} /> */}
          <DeleteOption id={id} name={name} />
        </div>
      );
    },
  },
];
