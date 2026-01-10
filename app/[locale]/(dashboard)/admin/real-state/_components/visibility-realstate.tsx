import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { useState } from "react";
import ActionModal from "../../real-state/_components/action-modal";
import VisibilityForm from "./visibility-form";

type VisibilityCityProps = {
  id: string;
  name: string;
  online: boolean;
};

export default function VisibilityRealstate({
  id,
  name,
  online,
}: VisibilityCityProps) {
  const [open, setOpen] = useState(false);
  return (
    <ActionModal
      open={open}
      setOpen={setOpen}
      title={`Visibilité de "${name}"`}
      action={
        <span className="flex justify-center items-center bg-neutral-500/10 p-1 rounded-full min-w-6 max-w-6 min-h-6 max-h-6 text-neutral-500 cursor-pointer">
          {online ? (
            <ToggleRightIcon size={13} />
          ) : (
            <ToggleLeftIcon size={13} />
          )}
        </span>
      }
    >
      <VisibilityForm setOpen={setOpen} id={id} name={name} online={online} />
    </ActionModal>
  );
}
