"use client";
import { unique, update } from "@/actions/option";
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
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import v from "voca";
import InputFile from "../../real-state/_components/input-file";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ReactSVG } from "react-svg";

type UpdateFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  icon: string;
  name: string;
  translate: string;
};

export default function UpdateForm({
  setOpen,
  name,
  id,
  icon,
  translate,
}: UpdateFormProps) {
  const form = useForm<OptionSchemaType>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      icon: undefined,
      name: "",
      translate: "",
    },
  });

  const [image, setImage] = useState(icon);

  const query = useQuery({
    queryKey: ["option", id],
    queryFn: () => unique(id),
  });

  const { mutate, isPending } = useQueryAction<
    OptionSchemaType & { id: string },
    RequestResponse<OptionType[]>
  >(
    update,
    () => {
      form.reset();
      setOpen(false);
    },
    "options",
  );

  useEffect(() => {
    // if (query.data?.data?.icon) {
    //   form.setValue("icon", query.data.data.icon as File | undefined);
    // }
    if (name) {
      form.setValue("name", v.titleCase(name));
      form.setValue("translate", v.titleCase(translate));
    }
  }, [query.data]);

  useEffect(() => {
    if (icon) setImage(icon);
  }, [icon]);
  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    form.reset();
    setOpen(false);
  }

  function submit(formData: OptionSchemaType) {
    const validateData = optionSchema.safeParse(formData);
    if (validateData.success && id) {
      mutate({ ...formData, id });
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
                {query.isLoading ? (
                  <Skeleton className="bg-neutral-200 w-full h-[130px]" />
                ) : (
                  <div className="relative">
                    {image && (
                      <div className="absolute z-20 flex justify-center items-center top-2 left-2 w-10 h-10 rounded-sm bg-neutral-200">
                        <ReactSVG
                          src={image}
                          beforeInjection={(svg) => {
                            svg.setAttribute("width", "25");
                            svg.setAttribute("height", "25");
                          }}
                        />
                      </div>
                    )}
                    <InputFile
                      hasUnique={true}
                      error={!!fieldState.error?.message}
                      handleFiles={(e) => {
                        field.onChange(e);
                      }}
                      isIcon={true}
                    />
                  </div>
                )}
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
        <div className="flex justify-end gap-x-2">
          <Button
            type="submit"
            variant="search"
            className="flex justify-center bg-(--bright-green) shadow-none rounded-lg h-10"
          >
            {isPending && <Spinner className="w-4 h-4 text-(--light)" />}
            {!isPending && "Modifier"}
          </Button>
          <Button
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
