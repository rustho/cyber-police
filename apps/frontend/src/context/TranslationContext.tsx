"use client";

import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

const TranslationContext = createContext<{ t: any } | null>(null);

export function TranslationProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const { t } = useTranslation();

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useT() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useT must be used within TranslationProvider");
  }
  return context.t;
}
