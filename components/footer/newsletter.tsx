"use client";
import { Button } from "../ui/button";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emailSchema, EmailSchemaType } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import {
  FacebookIcon,
  InstagramIcon,
  Linkedin2Icon,
  YoutubeIcon,
} from "../ui/icon";
import { useScopedI18n } from "@/locales/client";
import { action } from "@/actions/newsletter";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function Newsletter() {
  const t = useScopedI18n("footer");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function submit(formData: EmailSchemaType) {
    const validateData = emailSchema.safeParse(formData);
    if (validateData.success) {
      setIsLoading(true);
      const sending = await action(formData.email as string);
      setIsLoading(false);
      if (sending.status) {
        form.reset();
        return toast.success(sending.message);
      }
      return toast.error(sending.message);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="mb-2 font-semibold text-xl uppercase">
        {t("newsletter.title")}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="gap-y-3 grid grid-cols-1 sm:grid-cols-[1fr_146px] bg-transparent sm:bg-(--light) rounded-full w-full h-auto sm:h-12"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t("newsletter.placeholder")}
                    className="bg-(--light) sm:bg-transparent px-3 border-none rounded-r-full sm:rounded-r-none rounded-l-full w-full h-[48px] sm:h-full text-(--deep-dark)"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="subscriber"
            className="flex justify-center w-full sm:w-[146px] h-[48px] sm:h-full"
          >
            {isLoading && <Spinner className="stroke-(--light) w-4 h-5" />}
            {!isLoading && t("newsletter.button")}
          </Button>
        </form>
      </Form>
      <ul className="flex justify-between sm:justify-start items-center gap-x-3">
        <li>
          <Link
            href="https://www.facebook.com/upsidegabon"
            target="_blank"
            className="left-0.5 relative flex justify-center items-center w-6 h-6"
          >
            <FacebookIcon className="fill-(--light)" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.instagram.com/upside_gabon/"
            target="_blank"
            className="flex justify-center items-center w-6 h-6"
          >
            <InstagramIcon className="fill-(--light)" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/company/upside-gabon-agence-immobilière/?viewAsMember=true"
            target="_blank"
            className="flex justify-center items-center w-6 h-6"
          >
            <Linkedin2Icon className="fill-(--light)" />
          </Link>
        </li>
        <li>
          <Link href="#" className="flex justify-center items-center w-6 h-6">
            <YoutubeIcon className="fill-(--light)" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
