import Image from "next/image";
import { useTranslations } from "next-intl";

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

export const About = () => {
  const t = useTranslations();

  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300">{t("about.description1")}</p>
            <p className="text-lg text-gray-300">{t("about.description2")}</p>
            <p className="text-lg text-gray-300">{t("about.description3")}</p>
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
            title={t("about.features.deduction.title")}
            description={t("about.features.deduction.description")}
          />
          <FeatureCard
            title={t("about.features.cyberpunk.title")}
            description={t("about.features.cyberpunk.description")}
          />
          <FeatureCard
            title={t("about.features.roles.title")}
            description={t("about.features.roles.description")}
          />
          <FeatureCard
            title={t("about.features.online.title")}
            description={t("about.features.online.description")}
          />
        </div>
      </div>
    </section>
  );
};
