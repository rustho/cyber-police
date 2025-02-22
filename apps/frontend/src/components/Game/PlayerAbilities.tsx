import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

interface PlayerAbilitiesProps {
  phase: "day" | "night" | "voting";
  role: string;
}

export const PlayerAbilities = ({ phase, role }: PlayerAbilitiesProps) => {
  const t = useTranslations();

  const getAbilities = () => {
    // This would be expanded based on role and phase
    switch (role) {
      case "detective":
        return phase === "night" ? ["investigate"] : [];
      case "doctor":
        return phase === "night" ? ["heal"] : [];
      default:
        return [];
    }
  };

  const abilities = getAbilities();

  return (
    <div className="flex gap-2">
      {abilities.map((ability) => (
        <Button key={ability} variant="default">
          {t(`game.abilities.${ability}`)}
        </Button>
      ))}
    </div>
  );
};
