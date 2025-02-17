import { usePathname, useRouter, routing, getPathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = useParams();
  const locales = routing.locales;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.replace("/", { locale });
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={locale}
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
