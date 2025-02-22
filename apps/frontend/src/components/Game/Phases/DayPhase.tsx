import { Player } from "@/types/lobby";
import { GamePhaseLayout } from "../ui/GamePhaseLayout";
import { useTranslations } from "next-intl";
import { mockPlayers } from "@cyber-police/shared/src/mocks";

interface DayPhaseProps {
  players: Player[];
  currentPlayer: Player;
  lobbyId: string;
}

export const DayPhase = ({
  players,
  currentPlayer,
  lobbyId,
}: DayPhaseProps) => {
  const t = useTranslations();

  return (
    <GamePhaseLayout
      phase="day"
      players={mockPlayers}
      currentPlayer={mockPlayers[0]}
      lobbyId={lobbyId}
    >
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          {t("game.phases.day.title")}
        </h2>
        <p>{t("game.phases.day.description")}</p>
      </div>
    </GamePhaseLayout>
  );
};
