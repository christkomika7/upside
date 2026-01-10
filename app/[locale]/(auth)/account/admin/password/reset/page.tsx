"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { rubik } from "@/font/font";
import { authClient } from "@/lib/auth-client";
import { passwordSchema, PasswordSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PasswordResetPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useQueryState("token");
  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function submit(formData: PasswordSchemaType) {
    const validateData = passwordSchema.safeParse(formData);
    setIsLoading(true);
    if (validateData.success && token) {
      const { error } = await authClient.resetPassword({
        newPassword: formData.newPassword,
        token,
      });

      if (error) {
        toast.error(
          "Erreur lors de la réinitialisation du mot de passe, veuillez réessayer."
        );
        setIsLoading(false);
      } else {
        toast.success(
          "Votre nouveau mot de passe à été réinitialisé avec succès."
        );
        setIsLoading(false);
        router.push("/account/admin/login");
      }
    }
  }
  return (
    <div className="flex justify-center items-center p-2 w-full h-auto min-h-svh">
      <div className="flex flex-col justify-start items-start space-y-4 mx-auto w-full max-w-xs">
        <Logo />
        <div className="space-y-1">
          <h2 className="font-bold text-zinc-700 text-lg">
            Définir un nouveau mot de passe
          </h2>
          <p className="text-zinc-500 text-sm">
            Veuillez saisir un nouveau mot de passe sécurisé pour accéder à
            votre compte.
          </p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-2 rounded-xl w-full"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              name="oldPassword"
              control={form.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="-space-y-2">
                  <FormLabel className={clsx("text-sm", rubik.className)}>
                    Nouveau Mot de passe*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Veuillez renseigner le nouveau mot de passe"
                      className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="-space-y-2">
                  <FormLabel className={clsx("text-sm", rubik.className)}>
                    Confirmer Mot de passe*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Veuillez renseigner le nouveau mot de passe"
                      className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2 mt-2">
              <Button
                type="submit"
                variant="search"
                className="flex justify-center bg-(--bright-green) shadow-none rounded-lg w-full max-w-full h-10"
              >
                {isLoading && <Spinner className="w-4 h-4 text-(--light)" />}
                {!isLoading && "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>

        {/* {(isError || isSuccess) && (
      <div className="p-4">
        <Notifications
          message={
            notification.message ||
            notification.error ||
            notification.success
          }
          isMessage={!!notification.message}
          isSuccess={!!notification.success}
          isError={!!notification.error}
        />
      </div>
    )} */}

        <div className="flex justify-center w-full text-center">
          <Link
            href="/login"
            className="flex justify-end items-center gap-x-1 w-full text-neutral-500 text-sm"
          >
            <LogInIcon size={15} />
            Page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
