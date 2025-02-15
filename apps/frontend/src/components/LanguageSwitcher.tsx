import { routing, usePathname, useRouter } from "@/i18n/routing";

const locales = ["en", "ru", "es"];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.replace("/", { locale });
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={locales[0]}
      className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
