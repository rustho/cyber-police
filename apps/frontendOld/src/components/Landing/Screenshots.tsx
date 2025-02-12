import { getTranslation } from "@/utils/getTranslation";
import Image from "next/image";
import { useState } from "react";

export const Screenshots = async () => {
  const { t } = await getTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t("screenshots.dayPhase"),
      image: "/images/phase_day.webp",
    },
    {
      title: t("screenshots.nightPhase"),
      image: "/images/phase_night.webp",
    },
    {
      title: t("screenshots.votingPhase"),
      image: "/images/phase_voting.webp",
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative">
          {/* Current Slide */}
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full"
          >
            {/* Left arrow icon */}
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full"
          >
            {/* Right arrow icon */}
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors
                  ${
                    index === currentSlide
                      ? "bg-blue-600"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
