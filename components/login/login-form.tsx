"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { env } from "@/env.config";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submit(formData: LoginSchemaType) {
    const validateData = loginSchema.safeParse(formData);
    if (validateData.success) {
      setIsLoading(true);
      const response = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/admin/real-state",
        rememberMe: false,
      });
      if (response.error) {
        toast.error(
          "Impossible de se connecter, certain de vos identifiants sont invalides."
        );
        return setIsLoading(false);
      }
      setIsLoading(false);
    }
  }

  async function forgetPassword(e: React.SyntheticEvent) {
    e.preventDefault();
    router.push("/account/admin/password/reset")
  }
  return (
    <div className="bg-white shadow shadow-slate-400/30 p-4 rounded-lg w-full max-w-xs">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="-space-y-1">
                <FormLabel className="text-sm">Email*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white border border-(--blue-light) rounded-lg h-9"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="-space-y-1">
                <FormLabel className="flex justify-between items-center text-sm">
                  Mot de pase*
                  <p
                    onClick={forgetPassword}
                    className="!text-indigo-600 text-xs cursor-pointer"
                  >
                    Mot de passe oublié ?
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="bg-white border border-(--blue-light) rounded-lg h-9"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            variant="search"
            className="flex justify-center items-center rounded-lg w-full max-w-full h-10"
          >
            {isLoading && <Spinner size="small" className="text-(--light)" />}
            {!isLoading && "Se connecter"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
