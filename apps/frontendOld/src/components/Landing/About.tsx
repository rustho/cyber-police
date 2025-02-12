import { useTranslation } from "@/i18n/server";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/getTranslation";

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export const About = async () => {
  const { t } = await getTranslation();

  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300">{t("about.description1")}</p>
            <p className="text-lg text-gray-300">{t("about.description2")}</p>
            <button
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-500 transition-colors"
            >
              {t("about.learnMore")}
            </button>
          </div>

          {/* Image */}
          <div className="relative h-[400px]">
            <Image
              src="/images/neon_mirage.webp"
              alt="Neon Mirage"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <FeatureCard
            title="Feature 1"
            description={t("about.features.deduction")}
          />
          <FeatureCard
            title="Feature 2"
            description={t("about.features.cyberpunk")}
          />
          <FeatureCard
            title="Feature 3"
            description={t("about.features.roles")}
          />
          <FeatureCard
            title="Feature 4"
            description={t("about.features.online")}
          />
        </div>
      </div>
    </section>
  );
};
