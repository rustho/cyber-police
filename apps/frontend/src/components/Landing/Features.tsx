"use client";

import { useTranslations } from "next-intl";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  descriptions: string;
}

const FeatureCard = ({ icon, title, descriptions }: FeatureCardProps) => (
  <div
    className="relative p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all 
    duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="space-y-2">{descriptions}</p>
  </div>
);

export const Features = () => {
  const t = useTranslations();

  const featureKeys = [
    "hiddenRoles",
    "digitalAttacks",
    "ghostInfluence",
    "multiplayer",
  ] as const;

  const features = featureKeys.map((key) => ({
    icon: <></>,
    title: t(`features.${key}.title`),
    descriptions: t(`features.${key}.description`),
  }));

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 bg-gray-900 opacity-95">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/neon_mirage.webp')",
            backgroundSize: "100% 100%",
            opacity: "0.1",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          {t("features.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              descriptions={feature.descriptions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
