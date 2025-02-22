import { Player } from "@/types/lobby";
import { GamePhaseLayout } from "../GamePhaseLayout";
import { useTranslations } from "next-intl";
import { mockPlayers } from "@/utils/mockPlayers";

interface NightPhaseProps {
  players: Player[];
  currentPlayer: Player;
  lobbyId: string;
}

export const NightPhase = ({
  players,
  currentPlayer,
  lobbyId,
}: NightPhaseProps) => {
  const t = useTranslations();

  return (
    <GamePhaseLayout
      phase="night"
      players={mockPlayers}
      currentPlayer={mockPlayers[0]}
      lobbyId={lobbyId}
    >
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          {t("game.phases.night.title")}
        </h2>
        <p>{t("game.phases.night.description")}</p>
      </div>
    </GamePhaseLayout>
  );
};
