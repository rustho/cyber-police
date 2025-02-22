import { useTranslations } from "next-intl";

interface PhaseStateProps {
  phase: "day" | "night" | "voting";
}

export const PhaseState = ({ phase }: PhaseStateProps) => {
  const t = useTranslations();

  return (
    <div className="bg-gray-900/80 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {t(`game.phases.${phase}.title`)}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-white">{t("game.timeRemaining")}: 2:30</span>
        </div>
      </div>
    </div>
  );
};
