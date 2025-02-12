export const fallbackLng = "en";
export const languages = ["ru", "en", "es"];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

// Create new i18n configuration
export const i18n = {
  defaultLocale: "ru",
  locales: ["en", "es", "ru"],
} as const;
