"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import i18next from "../i18n/client";
import { TranslationProvider as TranslationContextProvider } from "@/context/TranslationContext";

export default function TranslationProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  useEffect(() => {
    i18next.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18next} defaultNS={"common"}>
      <TranslationContextProvider locale={locale}>
        {children}
      </TranslationContextProvider>
    </I18nextProvider>
  );
}
