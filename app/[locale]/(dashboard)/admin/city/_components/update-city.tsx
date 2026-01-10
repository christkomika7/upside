import { EditIcon } from "lucide-react";
import { useState } from "react";
import ActionModal from "../../real-state/_components/action-modal";
import UpdateForm from "./update-form";

type UpdateCityProps = {
  id: string;
  name: string;
};

export default function UpdateCity({ id, name }: UpdateCityProps) {
  const [open, setOpen] = useState(false);
  return (
    <ActionModal
      open={open}
      setOpen={setOpen}
      title="Modification de la ville"
      maxHeight="!max-h-[235px]"
      action={
        <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
          <EditIcon size={13} />
        </span>
      }
    >
      <UpdateForm setOpen={setOpen} id={id} name={name} />
    </ActionModal>
  );
}
