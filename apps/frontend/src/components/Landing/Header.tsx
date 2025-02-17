"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Link } from "@/i18n/routing";
export const Header = () => {
  const t = useTranslations();

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
              href="/gameplay"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="ri-gamepad-line mr-2" />
              {t("header.menu.gameplay")}
            </Link>
            <Link
              href="/roles"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="ri-team-line mr-2" />
              {t("header.menu.roles")}
            </Link>
            <Link
              href="/news"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <i className="ri-newspaper-line mr-2" />
              {t("header.menu.news")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};
