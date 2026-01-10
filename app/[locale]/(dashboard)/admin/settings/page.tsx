import UserInfos from "./_components/user-infos";
import clsx from "clsx";
import { rubik } from "@/font/font";

export default function SettingsPage() {
  return (
    <>
      <div className="-space-y-0.5 pt-6">
        <h2
          className={clsx(
            "font-semibold text-(--turquoise) text-xl uppercase",
            rubik.className,
          )}
        >
          Paramètre
        </h2>
        <p className={clsx("text-neutral-400 text-sm", rubik.className)}>
          Configurer votre compte
        </p>
      </div>
      <div className="space-y-2 pt-10">
        <UserInfos />
      </div>
    </>
  );
}
