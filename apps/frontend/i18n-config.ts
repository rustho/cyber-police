export const i18n = {
  defaultLocale: "ru",
  locales: ["en", "ru", "es"],
  localePrefix: "always",
} as const;

export type Locale = (typeof i18n)["locales"][number];
