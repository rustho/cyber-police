import { useTranslation } from "next-i18next";
import { useState } from "react";

export const CTA = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Add your email submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="join-alpha" className="py-24 relative overflow-hidden">
      {/* Neon Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1), rgba(0, 0, 0, 0))",
        }}
      />

      {/* Animated Background Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-blue-400"
            style={{
              top: `${20 * i}%`,
              animation: `moveLines ${3 + i}s linear infinite`,
              opacity: 0.5 - i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-6 
          animate-pulse-slow neon-text"
        >
          {t("cta.title")}
        </h2>

        <p className="text-xl text-blue-200 mb-8">{t("cta.subtitle")}</p>

        <p className="text-lg text-blue-300 mb-12 italic">
          {t("cta.motivation")}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("cta.email.placeholder")}
              className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-white 
                border-2 border-blue-500/30 focus:border-blue-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold
                hover:bg-blue-500 transition-colors duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
                transform hover:-translate-y-0.5"
            >
              {status === "loading" ? "..." : t("cta.email.submit")}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 text-green-400">{t("cta.email.success")}</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-400">{t("cta.email.error")}</p>
          )}
        </form>
      </div>
    </section>
  );
};
