"use client";
import { RealStateType } from "@/lib/type";
import { formatPrice, limiteName } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import v from "voca";
import DeleteRealstate from "./delete-realstate";
import VisibilityRealstate from "./visibility-realstate";
import Link from "next/link";
import { DownloadIcon, EditIcon, InfoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<RealStateType>[] = [
  {
    accessorKey: "index",
    header: "ID",
    cell: ({ row }) => {
      const index = row.index;
      return <div className="flex justify-center text-sm">{index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <div className="flex justify-center text-sm">
          {v.titleCase(limiteName(title))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex justify-center text-sm">
          {v.titleCase(limiteName(status))}
        </div>
      );
    },
  },
  {
    accessorKey: "online",
    header: "Visibilité",
    cell: ({ row }) => {
      const online = row.original.online;
      return (
        <div className="flex justify-center text-sm">
          <Badge variant={online ? "success" : "error"}>
            {online ? "En ligne" : "Hors ligne"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <div className="flex justify-center text-sm">
          {price && Number(price) !== 0
            ? formatPrice(Number(price)) + " XAF"
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, title, online } = row.original;
      return (
        <div className="flex justify-center items-center gap-x-1">
          <VisibilityRealstate id={id} name={title} online={online} />
          <Link href={"/admin/real-state/export/" + id}>
            <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
              <DownloadIcon size={13} />
            </span>
          </Link>
          <Link href={"/admin/real-state/" + id}>
            <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
              <InfoIcon size={13} />
            </span>
          </Link>
          <Link href={"/admin/real-state/edit/" + id}>
            <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
              <EditIcon size={13} />
            </span>
          </Link>
          <DeleteRealstate id={id} name={title} />
        </div>
      );
    },
  },
  {
    accessorKey: "property",
    header: "Proprieté",
    enableHiding: true,
  },
  {
    accessorKey: "bedroom",
    header: "Chambres",
    enableHiding: true,
  },
  {
    accessorKey: "bathroom",
    header: "Douches",
    enableHiding: true,
  },
  {
    accessorKey: "city",
    header: "Ville",
    enableHiding: true,
  },
  {
    accessorKey: "room",
    header: "Pièces",
    enableHiding: true,
  },
  {
    accessorKey: "area",
    header: "Quartier",
    enableHiding: true,
  },
  {
    accessorKey: "view",
    header: "Vue",
    enableHiding: true,
  },
  {
    accessorKey: "garden",
    header: "Jardin",
    enableHiding: true,
  },
  {
    accessorKey: "pool",
    header: "Piscine",
    enableHiding: true,
  },
  {
    accessorKey: "furnished",
    header: "Meublé",
    enableHiding: true,
  },
  {
    accessorKey: "terrace",
    header: "Terrace",
    enableHiding: true,
  },
  {
    accessorKey: "gym",
    header: "Salle de sport",
    enableHiding: true,
  },
  {
    accessorKey: "generator",
    header: "Groupe élèctrogene",
    enableHiding: true,
  },
];
