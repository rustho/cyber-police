"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface RoleCardProps {
  name: string;
  description: string;
  alignment: string;
  abilities: string;
}

const RoleCard = ({
  name,
  description,
  alignment,
  abilities,
}: RoleCardProps) => {
  const t = useTranslations();

  const getRoleBackground = (alignment: string) => {
    switch (alignment) {
      case t("roles.filters.cyberPolice"):
        return 'bg-[url("/images/landing/role_cyberPolice.webp")]';
      case t("roles.filters.replicants"):
        return 'bg-[url("/images/landing/role_replicants.webp")]';
    }
  };

  const getRoleColor = (alignment: string) => {
    switch (alignment) {
      case t("roles.filters.cyberPolice"):
        return "bg-blue-500";
      case t("roles.filters.replicants"):
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
      <div
        className={`h-32 bg-cover bg-center ${getRoleBackground(alignment)}`}
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${getRoleColor(
              alignment
            )}`}
          >
            {alignment}
          </span>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="text-gray-400 space-y-2">{abilities}</div>
      </div>
    </div>
  );
};

export const Roles = () => {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const roles = [
    "detective",
    "hacker",
    "netrunner",
    "informant",
    "infiltrator",
    "mastermind",
  ] as const;

  const filterOptions = [
    { id: "all", label: t("roles.filters.all") },
    { id: "cyberPolice", label: t("roles.filters.cyberPolice") },
    { id: "replicants", label: t("roles.filters.replicants") },
  ];

  const filteredRoles = roles.filter((role) => {
    if (activeFilter === "all") return true;
    return (
      t(`roles.list.${role}.alignment`) === t(`roles.filters.${activeFilter}`)
    );
  });

  return (
    <section id="roles" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          {t("roles.title")}
        </h2>

        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          {t("roles.description")}
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role}
              name={t(`roles.list.${role}.name`)}
              description={t(`roles.list.${role}.description`)}
              alignment={t(`roles.list.${role}.alignment`)}
              abilities={t(`roles.list.${role}.abilities`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
