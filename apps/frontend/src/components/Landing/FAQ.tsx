"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="border-b border-gray-700 last:border-0">
    <button
      className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      onClick={onClick}
    >
      <span className="text-lg font-medium text-white">{question}</span>
      ОТКРЫТЬ
    </button>
    <div
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-48 opacity-100 mb-6" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-gray-300">{answer}</p>
    </div>
  </div>
);

interface FAQQuestion {
  question: string;
  answer: string;
}

export const FAQ = async () => {
  const t = useTranslations();
  const questions = (t("faq.questions", { returnObjects: true }) ||
    []) as FAQQuestion[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          {t("faq.title")}
        </h2>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          {Array.isArray(questions) &&
            questions.map((item: FAQQuestion, index: number) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
