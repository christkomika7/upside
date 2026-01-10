import LoginForm from "@/components/login/login-form";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 bg-(--light) w-dvw h-dvh">
      <h2 className="relative flex items-center bg-white p-3 rounded-lg w-full max-w-xs font-semibold text-neutral-500 text-center uppercase">
        <Link
          href="/"
          className="flex justify-center items-center bg-(--light) border border-(--blue-light) rounded-full w-8 h-8"
        >
          <ArrowLeftIcon size={20} />
        </Link>
        <span className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          Tableau de bord
        </span>
      </h2>
      <LoginForm />
    </div>
  );
}
