"use client";
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
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SettingsFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SettingsForm({ setOpen }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function submit(formData: PasswordSchemaType) {
    const validateData = passwordSchema.safeParse(formData);
    if (validateData.success) {
      setIsLoading(true);
      const response = await authClient.changePassword({
        newPassword: formData.newPassword,
        currentPassword: formData.oldPassword,
      });

      if (response.error) {
        toast.error(
          "Erreur lors du changement du mot de passe, veuillez verifier votre ancien mot de passe."
        );
        setIsLoading(false);
        return;
      }
      toast.success("Votre mot de passe a bien été changé.");
      setIsLoading(false);
      setOpen(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Ancien Mot de passe*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Veuillez renseigner l'ancien mot de passe"
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
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="search"
            className="flex justify-center bg-(--bright-green) shadow-none rounded-lg h-10"
          >
            {isLoading && <Spinner size="small" className="text-(--light)" />}
            {!isLoading && "Modifier"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
