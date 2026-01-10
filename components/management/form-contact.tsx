"use client";
import { useState, RefObject, useEffect } from "react";
import clsx from "clsx";
import { rubik } from "@/font/font";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  bathrooms,
  bedrooms,
  housePropertiesType,
  housePropertiesType2,
  housePropertyStatus,
  housePropertyStatus2,
} from "@/data/product";
import { useForm } from "react-hook-form";
import { HouseSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import InputSelect from "../form/input-select";
import { useScopedI18n } from "@/locales/client";
import InputPropertySelect from "../form/input-property-select";
import { z } from "zod";
import { action } from "@/actions/ask";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import InputStatusSelect from "../form/input-status-select";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ClientPlaceType, FiltersType } from "@/lib/type";
import { filters } from "@/actions/filters";
import SelectFilter from "../form/select-filter";
import InputCitySelect from "../form/input-city-select";

type FormContactProps = {
  ref: RefObject<HTMLDivElement | null>;
};

export default function FormContact({ ref }: FormContactProps) {
  const t = useScopedI18n("management.contact.form");
  const tValidation = useScopedI18n("message.house.form");
  const [isLoading, setIsLoading] = useState(false);
  const [cityList, setCityList] = useState<ClientPlaceType[]>([]);

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  function getHouseSchema() {
    return z.object({
      status: z.string().min(1, {
        message: tValidation("status"),
      }),
      property: z.string().min(1, {
        message: tValidation("property"),
      }),
      city: z.string().min(1, {
        message: tValidation("city"),
      }),
      district: z.string().min(1, {
        message: tValidation("district"),
      }),
      bedrooms: z.string().min(1, {
        message: tValidation("bedroom"),
      }),
      bathrooms: z.string().min(1, {
        message: tValidation("bathroom"),
      }),
      username: z
        .string()
        .min(1, {
          message: tValidation("username"),
        })
        .trim(),
      email: z
        .string()
        .min(1, {
          message: tValidation("empty_email"),
        })
        .email({
          message: tValidation("invalid_email"),
        })
        .trim(),
      phone: z
        .string()
        .min(1, {
          message: tValidation("telephone"),
        })
        .trim(),
      message: z
        .string()
        .min(1, {
          message: tValidation("message"),
        })
        .trim(),
    });
  }

  const houseSchema = getHouseSchema();
  const form = useForm<HouseSchemaType>({
    resolver: zodResolver(houseSchema),
    defaultValues: {
      status: "",
      property: "",
      city: "",
      district: "",
      bedrooms: "",
      bathrooms: "",
      username: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (query.data?.cities) {
      setCityList([
        ...query.data.cities.map((f, index) => ({
          id: index.toString(),
          content: f.name,
        })),
      ]);
    }
  }, [query.data?.cities]);

  async function submit(formData: HouseSchemaType) {
    const validateData = houseSchema.safeParse(formData);
    if (validateData.success) {
      setIsLoading(true);
      const sending = await action(formData);
      setIsLoading(false);
      if (sending.status) {
        form.reset();
        return toast.success(sending.message);
      }
      return toast.error(sending.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div
          ref={ref}
          className="flex flex-col items-center space-y-4 bg-white/30 mx-auto p-6 rounded-[32px] w-full max-w-[896px]"
        >
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 w-full">
            <FormField
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <InputStatusSelect
                      placeholder={t("status")}
                      data={housePropertyStatus2}
                      addData={field.onChange}
                      hasError={!!fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="property"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <InputPropertySelect
                      placeholder={t("property")}
                      data={housePropertiesType2}
                      addData={field.onChange}
                      hasError={!!fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className={clsx("-space-y-1", rubik.className)}>
                  <FormControl>
                    <InputCitySelect
                      placeholder={t("city")}
                      data={cityList}
                      isLoading={query.isLoading}
                      addData={field.onChange}
                      hasError={!!fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 w-full">
            <FormField
              name="district"
              control={form.control}
              render={({ field }) => (
                <FormItem className={clsx("-space-y-1", rubik.className)}>
                  <FormControl>
                    <Input type="text" {...field} placeholder={t("district")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bedrooms"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <InputSelect
                      placeholder={t("bedroom")}
                      suffix={`${t("bed", { plural: Number(field.value) > 1 ? "s" : "" })}`}
                      data={bedrooms}
                      addData={field.onChange}
                      hasError={!!fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bathrooms"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <InputSelect
                      placeholder={t("bathroom")}
                      data={bathrooms}
                      suffix={`${t("bath", { plural: Number(field.value) > 1 ? "s" : "" })}`}
                      addData={field.onChange}
                      hasError={!!fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 w-full">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className={clsx("-space-y-1", rubik.className)}>
                  <FormLabel className="pl-4 text-sm">
                    {t("username")}*
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Jhon D." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className={clsx("-space-y-1", rubik.className)}>
                  <FormLabel className="pl-4 text-sm">{t("email")}*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="exemple@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className={clsx("-space-y-1", rubik.className)}>
                  <FormLabel className="pl-4 text-sm">{t("phone")}*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="+241 234 567 90"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="-space-y-1 w-full">
                <FormLabel className="pl-4 text-sm">{t("message")}*</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder={t("messagePlaceholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="search"
            className="max-w-[180px] h-[43px]"
          >
            {isLoading && <Spinner className="stroke-(--light) w-4 h-5" />}
            {!isLoading && t("button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
