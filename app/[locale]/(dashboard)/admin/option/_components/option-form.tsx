"use client";
import { create } from "@/actions/option";
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
import useQueryAction from "@/hooks/useQueryAction";
import { optionSchema, OptionSchemaType } from "@/lib/schemas";
import { OptionType, RequestResponse } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import InputFile from "../../real-state/_components/input-file";

type OptionFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OptionForm({ setOpen }: OptionFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<OptionSchemaType>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      icon: undefined,
      name: "",
      translate: "",
    },
  });

  const { mutate, isPending } = useQueryAction<
    OptionSchemaType,
    RequestResponse<OptionType>
  >(
    create,
    () => {
      queryClient.invalidateQueries({ queryKey: ["total-options"] });
      form.reset();
      setOpen(false);
    },
    "options"
  );

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    form.reset();
    setOpen(false);
  }

  function submit(formData: OptionSchemaType) {
    const validateData = optionSchema.safeParse(formData);
    if (validateData.success) {
      mutate(formData);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          name="icon"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <InputFile
                  hasUnique={true}
                  error={!!fieldState.error?.message}
                  handleFiles={(e) => field.onChange(e)}
                  isIcon={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Nom*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Veuillez saisir le nom de l'option"
                  className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="translate"
          control={form.control}
          render={({ field }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Traduction anglaise*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Veuillez saisir la traduction anglaise de l'option"
                  className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between sm:justify-end gap-x-2">
          <Button
            disabled={isPending}
            type="submit"
            variant="search"
            className="flex justify-center bg-(--bright-green) shadow-none rounded-lg h-10"
          >
            {isPending && <Spinner className="w-4 h-4 text-(--light)" />}
            {!isPending && "Ajouter"}
          </Button>
          <Button
            disabled={isPending}
            onClick={handleClose}
            variant="search"
            className="bg-neutral-100 shadow-none rounded-lg h-10 text-(--deep-dark)"
          >
            Quitter
          </Button>
        </div>
      </form>
    </Form>
  );
}
