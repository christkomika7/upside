"use client";
import { create } from "@/actions/city";
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
import { citySchema, CitySchemaType } from "@/lib/schemas";
import { CityType, RequestResponse } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";

type CityFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CityForm({ setOpen }: CityFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<CitySchemaType>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: "",
    },
  });

  const { mutate, isPending } = useQueryAction<
    CitySchemaType,
    RequestResponse<CityType>
  >(
    create,
    () => {
      queryClient.invalidateQueries({ queryKey: ["total-cities"] });
      form.reset();
      setOpen(false);
    },
    "cities"
  );

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    form.reset();
    setOpen(false);
  }

  function submit(formData: CitySchemaType) {
    const validateData = citySchema.safeParse(formData);
    if (validateData.success) {
      mutate(formData);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Ville*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Veuillez saisir la ville"
                  className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-x-2">
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
