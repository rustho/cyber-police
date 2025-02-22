"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { authService } from "@/api/services/authService";
import { routes } from "@/utils/routes";
interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.register(formData);
      if (data.access_token) {
        localStorage.setItem("jwt_token", data.access_token);
      }
      router.push(routes.signin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">
            {t("auth.signup.title")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-white">
                {t("auth.signup.username")}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1
                  border border-gray-600 bg-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="text-white">
                {t("auth.signup.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1
                  border border-gray-600 bg-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white">
                {t("auth.signup.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1
                  border border-gray-600 bg-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 rounded-lg
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("auth.signup.loading") : t("auth.signup.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};
