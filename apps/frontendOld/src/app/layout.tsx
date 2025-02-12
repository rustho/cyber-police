import { Inter } from "next/font/google";
import TranslationProvider from "@/components/TranslationProvider";
import { useTranslation } from "@/i18n/server";
import { Metadata } from "next";
import { languages } from "@/i18n/settings";
import { dir } from "i18next";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyber Police",
  description: "...",
};

export async function generateMetadata({
  params: { lang },
}): Promise<Metadata> {
  const { t } = await useTranslation(lang);

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const headersList = headers();
  const detectedLang = headersList.get("x-lang") || lang || "en";

  return (
    <html lang={detectedLang} dir={dir(detectedLang)}>
      <body className={inter.className}>
        <TranslationProvider locale={detectedLang}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
