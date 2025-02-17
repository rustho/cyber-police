"use client";

import { useTranslations } from "next-intl";

interface GameplayStepProps {
  title: string;
  description: string;
  imageUrl: string;
}

const GameplayStep = ({ title, description, imageUrl }: GameplayStepProps) => (
  <div className="flex flex-col md:flex-row items-center gap-8 py-12">
    <div className="w-full md:w-1/2">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
    <div
      className="w-full md:w-1/2 h-64 bg-gray-800 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  </div>
);

export const Gameplay = () => {
  const t = useTranslations();

  const steps = [
    "preparation",
    "dayPhase",
    "nightPhase",
    "votingPhase",
  ] as const;

  return (
    <section id="gameplay" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          {t("gameplay.title")}
        </h2>

        <div className="divide-y divide-gray-800">
          {steps.map((step) => (
            <GameplayStep
              key={step}
              title={t(`gameplay.steps.${step}.title`)}
              description={t(`gameplay.steps.${step}.description`)}
              imageUrl={`/images/gameplay_${step}.webp`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
