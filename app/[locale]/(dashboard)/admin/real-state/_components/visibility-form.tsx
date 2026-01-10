import { editVisibility, remove } from "@/actions/realstate";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import useQueryAction from "@/hooks/useQueryAction";
import { RealStateType, RequestResponse } from "@/lib/type";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import v from "voca";

type VisibilityFormProps = {
  id: string;
  name: string;
  online: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function VisibilityForm({
  id,
  name,
  setOpen,
  online,
}: VisibilityFormProps) {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(online);
  const { mutate, isPending } = useQueryAction<
    { id: string; isOnline: boolean },
    RequestResponse<RealStateType[]>
  >(
    editVisibility,
    () => {
      queryClient.invalidateQueries({ queryKey: ["total-realstates"] });
      setOpen(false);
    },
    "realstates"
  );
  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setOpen(false);
  }

  function submit() {
    if (id) {
      mutate({ id, isOnline });
    }
  }

  return (
    <div className="space-y-2">
      <p className="bg-blue-600/5 p-4 border border-blue-500 rounded-md text-blue-600 text-sm">
        {online && (
          <>
            Voulez vous rendre invisible <b>{v.titleCase(name)}</b>
          </>
        )}
        {!online && (
          <>
            Voulez vous rendre visible <b>{v.titleCase(name)}</b>
          </>
        )}
      </p>
      <div className="flex flex-row justify-between items-center bg-background p-3 border rounded-lg">
        <div className="space-y-0.5">
          <p className="text-sm">Publier le bien</p>
          <p className="text-xs">
            Cochez cette case pour afficher ce bien sur le site.
          </p>
        </div>
        <Switch checked={isOnline} onCheckedChange={setIsOnline} />
      </div>
      <div className="flex justify-end gap-x-2 pt-2">
        <Button
          onClick={submit}
          variant="search"
          className="flex justify-center bg-(--bright-green) shadow-none rounded-lg h-10"
        >
          {isPending && <Spinner className="w-4 h-4 text-(--light)" />}
          {!isPending && "Modifier"}
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
