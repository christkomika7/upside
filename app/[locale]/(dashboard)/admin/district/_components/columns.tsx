"use client";
import { Button } from "@/components/ui/button";
import { AreaType } from "@/lib/type";
import { limiteName } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import v from "voca";
import DeleteArea from "./delete-area";
import UpdateCity from "./update-area";

export const columns: ColumnDef<AreaType>[] = [
  {
    accessorKey: "index",
    header: "ID",
    cell: ({ row }) => {
      const index = row.index;
      return <div className="flex justify-center text-sm">{index + 1}</div>;
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
          Quartier
          <ArrowUpDownIcon className="w-4 h-4" />
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
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-transparent font-medium text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ville
          <ArrowUpDownIcon className="w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const city = row.original.city;
      return (
        <div className="flex justify-center text-sm">
          {v.titleCase(limiteName(city))}
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, name, city } = row.original;
      return (
        <div className="flex justify-center items-center gap-x-1">
          <UpdateCity id={id} name={name} city={city} />
          <DeleteArea id={id} name={name} />
        </div>
      );
    },
  },
];
