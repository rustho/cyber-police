import { useTranslation } from "next-i18next";

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t("welcome.title")}
      </h1>
      <p className="text-xl text-gray-600">{t("welcome.subtitle")}</p>
    </div>
  );
};
