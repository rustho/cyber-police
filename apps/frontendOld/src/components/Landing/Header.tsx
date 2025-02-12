import { getTranslation } from "@/utils/getTranslation";
import Link from "next/link";
import { LanguageSwitcher } from "../LanguageSwitcher";

export const Header = async () => {
  const { t } = await getTranslation();

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t("header.logo")}
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("header.menu.about")}
            </Link>
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("header.menu.features")}
            </Link>
            <Link
              href="#screenshots"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("header.menu.screenshots")}
            </Link>
            {/* <Link
              href="#join-alpha"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {t("header.menu.joinAlpha")}
            </Link> */}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};
