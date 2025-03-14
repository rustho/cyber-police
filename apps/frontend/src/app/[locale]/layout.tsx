import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import "@/styles/globals.css";
import "remixicon/fonts/remixicon.css";
import { Exo_2 as Exo2 } from "next/font/google";

const exo2 = Exo2({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-exo2",
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    redirect({
      href: `/`,
      locale: routing.defaultLocale,
    });
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} {...generateMetadata({ params: { locale } })}>
      <body className={`${exo2.className} bg-gray-900`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    className: `${exo2.variable}`,
  };
}
