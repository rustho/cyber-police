import { useTranslations } from "next-intl";

export const Welcome = async () => {
  const t = useTranslations();

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t("welcome.title")}
      </h1>
      <p className="text-xl text-gray-600">{t("welcome.subtitle")}</p>
    </div>
  );
};
