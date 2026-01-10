"use client";
import { Button } from "../ui/button";
import { rubik } from "@/font/font";
import clsx from "clsx";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { ContactSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useScopedI18n } from "@/locales/client";
import { z } from "zod";
import { useState } from "react";
import { action } from "@/actions/contact";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function FormContact() {
  const t = useScopedI18n("contact.form.input");
  const [isLoading, setIsLoading] = useState(false);

  const tValidation = useScopedI18n("message.contact.form");

  function getContactSchema() {
    return z.object({
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

  const contactSchema = getContactSchema();
  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function submit(formData: ContactSchemaType) {
    const validateData = contactSchema.safeParse(formData);
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
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col items-center space-y-4 bg-white/30 mx-auto p-6 rounded-[32px] w-full max-w-[896px]"
      >
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 w-full">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className={clsx("-space-y-1", rubik.className)}>
                <FormLabel className="pl-4 text-sm">{t("username")}*</FormLabel>
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
                  <Input type="text" {...field} placeholder="+241 234 567 90" />
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
        <Button variant="search" className="max-w-[180px] h-[43px]">
          {isLoading && <Spinner className="stroke-(--light) w-4 h-5" />}
          {!isLoading && t("button")}
        </Button>
      </form>
    </Form>
  );
}
