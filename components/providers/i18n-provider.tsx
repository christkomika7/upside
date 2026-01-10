"use client";
import { I18nProviderClient } from "@/locales/client";
import React from "react";

type I18nProviderProps = {
  children: React.ReactNode;
  locale: string;
};

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
