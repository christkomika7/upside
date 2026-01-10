"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActionModal from "../../real-state/_components/action-modal";
import { Table } from "@tanstack/react-table";
import { OptionType } from "@/lib/type";
import { SEARCH_DEBOUND } from "@/lib/constant";
import { useDebounce } from "@uidotdev/usehooks";
import OptionForm from "./option-form";

type ActionProps = {
  table: Table<OptionType>;
  isPending: boolean;
};

export default function Action({ table, isPending }: ActionProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, SEARCH_DEBOUND);

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <div className="flex xs:flex-row flex-col justify-start xs:justify-between items-start xs:items-center gap-2">
      <div className="relative w-full max-w-sm">
        <span className="top-1/2 left-3 absolute text-neutral-400 -translate-y-1/2">
          <SearchIcon size={15} />{" "}
        </span>
        <Input
          placeholder="Rechercher une option"
          onChange={(event) => setSearch(event.target.value)}
          className="bg-background shadow-xs pl-8 border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
        />
      </div>
      <ActionModal
        open={open}
        setOpen={setOpen}
        title="Ajouter une option"
        maxHeight="!max-h-[540px]"
        action={
          <Button
            disabled={isPending}
            variant="slider"
            className="shadow-none rounded-md w-full max-w-full xs:max-w-[200px] text-(--light)"
          >
            <PlusIcon /> Nouvelle option
          </Button>
        }
      >
        <OptionForm setOpen={setOpen} />
      </ActionModal>
    </div>
  );
}
