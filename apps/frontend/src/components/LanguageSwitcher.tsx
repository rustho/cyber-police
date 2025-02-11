import { useRouter } from "next/router";
import Link from "next/link";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <div className="flex gap-2">
      {router.locales?.map((locale) => (
        <Link
          key={locale}
          href={{ pathname, query }}
          as={asPath}
          locale={locale}
          className={`px-2 py-1 rounded ${
            router.locale === locale
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};
