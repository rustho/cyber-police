import { useTranslation } from "next-i18next";
import Image from "next/image";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 
              animate-pulse-slow neon-text"
            >
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 mb-8">
              {t("hero.subtitle")}
            </p>
            <button
              className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white 
              shadow-lg hover:bg-blue-500 transition-all duration-300 
              hover:shadow-blue-500/50 hover:scale-105"
            >
              {t("hero.cta")}
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <Image
              src="https://placekitten.com/400/300" // You'll need to add this image
              alt="Cyber Police Hero"
              width={600}
              height={600}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
