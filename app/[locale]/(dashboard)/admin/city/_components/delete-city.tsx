import { XIcon } from "lucide-react";
import { useState } from "react";
import ActionModal from "../../real-state/_components/action-modal";
import DeleteForm from "./delete-form";

type DeleteCityProps = {
  id: string;
  name: string;
};

export default function DeleteCity({ id, name }: DeleteCityProps) {
  const [open, setOpen] = useState(false);
  return (
    <ActionModal
      open={open}
      setOpen={setOpen}
      title="Supprimer une ville"
      maxHeight="!max-h-[230px]"
      action={
        <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
          <XIcon size={13} />
        </span>
      }
    >
      <DeleteForm setOpen={setOpen} id={id} name={name} />
    </ActionModal>
  );
}
