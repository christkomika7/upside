"use client";
import { Button } from "@/components/ui/button";
import { CityType } from "@/lib/type";
import { limiteName } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import v from "voca";
import DeleteCity from "./delete-city";
import UpdateCity from "./update-city";

export const columns: ColumnDef<CityType>[] = [
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
          Ville
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
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, name } = row.original;
      return (
        <div className="flex justify-center items-center gap-x-1">
          <UpdateCity id={id} name={name} />
          <DeleteCity id={id} name={name} />
        </div>
      );
    },
  },
];
