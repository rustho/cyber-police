import { useTranslation } from "next-i18next";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  descriptions: string[];
}

const FeatureCard = ({ icon: Icon, title, descriptions }: FeatureCardProps) => (
  <div
    className="relative p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all 
    duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-blue-400 mr-4" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <ul className="space-y-2">
      {descriptions.map((desc, index) => (
        <li key={index} className="text-gray-300">
          • {desc}
        </li>
      ))}
    </ul>
  </div>
);

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <></>,
      title: t("features.hiddenRoles.title"),
      descriptions: t("features.hiddenRoles.description", {
        returnObjects: true,
      }),
    },
    {
      icon: <></>,
      title: t("features.digitalAttacks.title"),
      descriptions: t("features.digitalAttacks.description", {
        returnObjects: true,
      }),
    },
    {
      icon: <></>,
      title: t("features.ghostInfluence.title"),
      descriptions: t("features.ghostInfluence.description", {
        returnObjects: true,
      }),
    },
    {
      icon: <></>,
      title: t("features.multiplayer.title"),
      descriptions: t("features.multiplayer.description", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 bg-gray-900 opacity-95">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "https://placekitten.com/400/300",
            backgroundSize: "100px 100px",
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
