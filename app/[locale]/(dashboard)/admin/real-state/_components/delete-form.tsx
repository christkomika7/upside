import { remove } from "@/actions/realstate";
import { Realstate } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useQueryAction from "@/hooks/useQueryAction";
import { AreaType, RealStateType, RequestResponse } from "@/lib/type";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import v from "voca";

type DeleteFormProps = {
  id: string;
  name: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteForm({ id, name, setOpen }: DeleteFormProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useQueryAction<
    { id: string },
    RequestResponse<RealStateType[]>
  >(
    remove,
    () => {
      queryClient.invalidateQueries({ queryKey: ["total-realstates"] });
      setOpen(false);
    },
    "realstates",
  );
  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setOpen(false);
  }

  function submit() {
    if (id) {
      mutate({ id });
    }
  }

  return (
    <div className="space-y-4">
      <p className="bg-red-600/5 p-4 border border-red-500 rounded-md text-red-600">
        Vous êtes sur le point de supprimer <b>{v.titleCase(name)}</b>{" "}
      </p>
      <div className="flex justify-end gap-x-2">
        <Button
          onClick={submit}
          variant="search"
          className="flex justify-center bg-red-600 shadow-none rounded-lg h-10"
        >
          {isPending && <Spinner className="w-4 h-4 text-(--light)" />}
          {!isPending && "Supprimer"}
        </Button>
        <Button
          onClick={handleClose}
          variant="search"
          className="bg-neutral-100 shadow-none rounded-lg h-10 text-(--deep-dark)"
        >
          Quitter
        </Button>
      </div>
    </div>
  );
}
