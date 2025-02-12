import { getTranslation } from "@/utils/getTranslation";
import { LandingPage } from "@/components/Landing/LandingPage";

export default async function Home() {
  const { t } = await getTranslation();

  return (
    <main>
      <h1>{t("welcome")}</h1>
      <LandingPage />
    </main>
  );
}
