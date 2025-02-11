import { useRouter } from "next/router";
import Link from "next/link";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <select
      onChange={handleLanguageChange}
      value={router.locale}
      className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
    >
      {router.locales?.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
