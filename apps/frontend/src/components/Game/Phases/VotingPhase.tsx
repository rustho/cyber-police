import { Player } from "@/types/lobby";
import { GamePhaseLayout } from "../ui/GamePhaseLayout";
import { useTranslations } from "next-intl";
import { PlayerCard } from "@/components/ui/PlayerCard";
import { mockPlayers } from "@cyber-police/shared/src/mocks";

interface VotingPhaseProps {
  players: Player[];
  currentPlayer: Player;
  lobbyId: string;
}

export const VotingPhase = ({
  players,
  currentPlayer,
  lobbyId,
}: VotingPhaseProps) => {
  const t = useTranslations();

  const handleVote = (playerId: number) => {
    console.log("Vote for", playerId);
  };

  return (
    <GamePhaseLayout
      phase="voting"
      players={mockPlayers}
      currentPlayer={mockPlayers[0]}
      lobbyId={lobbyId}
    >
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          {t("game.phases.voting.title")}
        </h2>
        <p>{t("game.phases.voting.description")}</p>

        <div className="grid grid-cols-3 gap-4">
          {mockPlayers.map((player) => (
            <PlayerCard
              onClick={() => handleVote(player.userId)}
              key={player.userId}
              player={player}
            />
          ))}
        </div>
      </div>
    </GamePhaseLayout>
  );
};
