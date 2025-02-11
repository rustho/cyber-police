import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";

export const Screenshots = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = t("screenshots.slides", { returnObjects: true });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="screenshots" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          {t("screenshots.title")}
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 p-3 rounded-full
              text-white hover:bg-blue-600 transition-colors"
          >
            {"<"}
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 p-3 rounded-full
              text-white hover:bg-blue-600 transition-colors"
          >
            {">"}
          </button>

          {/* Slides */}
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            {slides.map((slide: any, index: number) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500
                  ${
                    index === currentSlide
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
              >
                <Image
                  src={`https://placekitten.com/400/300`} // You'll need to add these images
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-300">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_: any, index: number) => (
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
