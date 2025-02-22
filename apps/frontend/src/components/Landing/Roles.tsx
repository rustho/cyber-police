"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface RoleCardProps {
  name: string;
  description: string;
  type: string;
  abilities: string;
  lore?: string;
  tips?: string;
  abilitySides?: {
    cyberPolice: string;
    replicants: string;
  };
}

const RoleCard = ({
  name,
  description,
  type,
  abilities,
  lore,
  tips,
  abilitySides,
}: RoleCardProps) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleBackground = (type: string) => {
    switch (type) {
      case t("roles.filters.information"):
        return 'bg-[url("/images/landing/role_information.webp")]';
      case t("roles.filters.attack"):
        return 'bg-[url("/images/landing/role_attack.webp")]';
      case t("roles.filters.defense"):
        return 'bg-[url("/images/landing/role_defense.webp")]';
      case t("roles.filters.manipulation"):
        return 'bg-[url("/images/landing/role_manipulation.webp")]';
    }
  };

  const getRoleColor = (type: string) => {
    switch (type) {
      case t("roles.filters.cyberPolice"):
        return "bg-blue-500";
      case t("roles.filters.replicants"):
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      >
        <div className={`h-32 bg-cover bg-center ${getRoleBackground(type)}`} />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getRoleColor(type)}`}
            >
              {type}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="text-gray-400 space-y-2">{abilities}</div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Lore Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Lore</h3>
                <p className="text-gray-300">{lore}</p>
              </div>

              {/* Abilities Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Abilities
                </h3>
                <p className="text-gray-300">{abilities}</p>

                {abilitySides && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-500/20 p-4 rounded">
                      <h4 className="font-semibold text-blue-400 mb-2">
                        Cyber Police
                      </h4>
                      <p className="text-gray-300">
                        {abilitySides.cyberPolice}
                      </p>
                    </div>
                    <div className="bg-red-500/20 p-4 rounded">
                      <h4 className="font-semibold text-red-400 mb-2">
                        Replicants
                      </h4>
                      <p className="text-gray-300">{abilitySides.replicants}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Tips</h3>
                <p className="text-gray-300">{tips}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Roles = () => {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const roles = ["detective"] as const;

  const filterOptions = [
    { id: "all", label: t("roles.filters.all") },
    { id: "information", label: t("roles.filters.information") },
    { id: "attack", label: t("roles.filters.attack") },
    { id: "defense", label: t("roles.filters.defense") },
    { id: "manipulation", label: t("roles.filters.manipulation") },
  ];

  const filteredRoles = roles.filter((role) => {
    if (activeFilter === "all") return true;
    return t(`roles.list.${role}.type`) === t(`roles.filters.${activeFilter}`);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role}
              name={t(`roles.list.${role}.name`)}
              description={t(`roles.list.${role}.description`)}
              type={t(`roles.list.${role}.type`)}
              abilities={t(`roles.list.${role}.abilities`)}
              lore={t(`roles.list.${role}.lore`)}
              tips={t(`roles.list.${role}.tips`)}
              abilitySides={{
                cyberPolice: t(`roles.list.${role}.abilitySides.cyberPolice`),
                replicants: t(`roles.list.${role}.abilitySides.replicants`),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
