"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import ActionModal from "../../real-state/_components/action-modal";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import SettingsForm from "./settings-form";
import { UserType } from "@/lib/type";

export default function UserInfos() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function getUser() {
    const data = await authClient.getSession();
    if (data.data?.user) {
      setUser(data.data.user);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="space-y-0.5">
      {isLoading && (
        <div className="space-y-1.5">
          <Skeleton className="bg-neutral-200 rounded-full w-[160px] h-5" />
          <Skeleton className="bg-neutral-200 rounded-full w-[240px] h-3" />
          <div className="flex justify-between gap-x-2">
            <Skeleton className="bg-neutral-200 rounded-full w-[190px] h-3" />
            <Skeleton className="bg-neutral-200 rounded-full w-5 h-5" />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <p className="font-semibold text-neutral-600">{user?.name}</p>
          <p className="text-neutral-500 text-sm">{user?.email}</p>
          <div className="items-center gap-x-2 grid grid-cols-[1fr_50px]">
            <p className="text-neutral-500 text-sm">*******************</p>
            <ActionModal
              setOpen={setOpen}
              open={open}
              title="Changer de mot de passe"
              maxHeight="!max-h-[335px]"
              action={
                <Button
                  variant="pagination"
                  className="bg-(--brown)/30 min-w-7 max-w-7 h-7"
                >
                  <EditIcon size={12} />
                </Button>
              }
            >
              <SettingsForm setOpen={setOpen} />
            </ActionModal>
          </div>
        </>
      )}
    </div>
  );
}
