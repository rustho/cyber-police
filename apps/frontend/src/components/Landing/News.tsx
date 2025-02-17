"use client";

import { useTranslations } from "next-intl";
import { changelog } from "./changelog";

export const News = () => {
  const t = useTranslations();
  const newsItems = changelog;

  return (
    <section className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-12">
      <h1
        className="text-6xl font-mono font-black text-green-500 mb-16 tracking-tight text-center relative 
        after:content-[''] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 
        after:w-24 after:h-1 after:bg-green-500 [text-shadow:_0_0_10px_#22c55e]"
      >
        {t("news.title")}
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="group bg-black p-6 rounded-none border-l-4 border-green-500 
              hover:border-green-400 transition-all duration-300 
              relative before:absolute before:inset-0 before:bg-green-900/5 
              before:pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="text-green-500 font-mono text-xs opacity-20 select-none"
                >
                  {Array.from({ length: 80 })
                    .map((_, j) => String.fromCharCode(33 + Math.random() * 93))
                    .join("")}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <time className="font-mono text-sm font-semibold text-green-400">
                [{new Date(item.date).toLocaleDateString()}]
              </time>
              <h2
                className="text-xl font-mono font-bold text-green-400
                group-hover:text-green-300 transition-colors duration-200
                [text-shadow:_0_0_5px_#22c55e]"
              >
                {item.title}
              </h2>
            </div>

            <div
              className="font-mono text-green-300/90 pl-4 relative z-10 
              before:absolute before:left-0 before:top-0 before:content-['>'] before:text-green-500 whitespace-pre-wrap"
            >
              {item.content}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
