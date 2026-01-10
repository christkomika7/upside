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
import { rubik } from "@/font/font";
import { areaSchema, AreaSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Combobox } from "@/components/combobox";
import useQueryAction from "@/hooks/useQueryAction";
import { AreaType, FiltersType, RequestResponse } from "@/lib/type";
import { update } from "@/actions/area";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { filters } from "@/actions/filters";
import v from "voca";

type CityFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  city: string;
  id: string;
};

export default function UpdateForm({ setOpen, name, city, id }: CityFormProps) {
  const queryClient = useQueryClient();
  const [cities, setCities] = useState<
    {
      id: number;
      label: string;
      value: string;
    }[]
  >([]);
  const form = useForm<AreaSchemaType>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      city: "",
      area: "",
    },
  });

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  const { mutate, isPending } = useQueryAction<
    AreaSchemaType & { id: string },
    RequestResponse<AreaType[]>
  >(
    update,
    () => {
      queryClient.invalidateQueries({ queryKey: ["total-areas"] });
      form.reset();
      setOpen(false);
    },
    "areas"
  );

  useEffect(() => {
    if (name && city) {
      form.setValue("city", v.titleCase(city));
      form.setValue("area", v.titleCase(name));
    }
  }, []);

  useEffect(() => {
    if (query.data?.cities) {
      setCities([
        ...query.data.cities.map((f, index) => ({
          id: index,
          label: v.titleCase(f.name),
          value: f.name,
        })),
      ]);
    }
  }, [query.data]);

  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    form.reset();
    setOpen(false);
  }

  function submit(formData: AreaSchemaType) {
    const validateData = areaSchema.safeParse(formData);
    if (validateData.success && id) {
      mutate({ ...formData, id });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Ville*
              </FormLabel>
              <FormControl>
                <Combobox
                  isPending={query.isLoading}
                  datas={cities}
                  value={field.value}
                  setValue={(value) => field.onChange(value as string)}
                  placeholder="Ex:..2"
                  emptyText="Ville"
                  notFoundText="Aucune ville trouvée."
                  error={!!fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem className="-space-y-2">
              <FormLabel className={clsx("text-sm", rubik.className)}>
                Quartier*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Veuillez renseigner un quartier"
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
            disabled={isPending}
            className="flex justify-center bg-(--bright-green) shadow-none rounded-lg h-10"
          >
            {isPending && <Spinner className="w-4 h-4 text-(--light)" />}
            {!isPending && "Modifier"}
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
