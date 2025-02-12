"use server";

import { headers } from "next/headers";
import { useTranslation } from "@/i18n/server";

export async function getTranslation() {
  const headersList = headers();
  const lang = headersList.get("x-lang") || "en";
  return await useTranslation(lang);
}
