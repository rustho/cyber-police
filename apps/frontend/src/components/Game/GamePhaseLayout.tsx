import { ReactNode } from "react";
import { Player } from "@/types/lobby";
import { GameChat } from "./GameChat";
import { PhaseState } from "./PhaseState";
import { PlayerAbilities } from "./PlayerAbilities";
import { PlayerStatus } from "./PlayerStatus";
import Image from "next/image";

interface GamePhaseLayoutProps {
  children: ReactNode;
  phase: "day" | "night" | "voting";
  players: Player[];
  currentPlayer: Player;
  lobbyId: string;
}

export const GamePhaseLayout = ({
  children,
  phase,
  players,
  currentPlayer,
  lobbyId,
}: GamePhaseLayoutProps) => {
  const role = "detective";
  return (
    <div
      className={`min-h-screen bg-cover bg-center ${getPhaseBackground(phase)}`}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto p-4 flex flex-col h-screen">
          {/* Header */}
          <header className="mb-4">
            <PhaseState phase={phase} />
          </header>

          {/* Main Content */}
          <main className="flex-1 grid grid-cols-12 gap-4">
            {/* Players List */}
            <div className="col-span-3 bg-gray-900/80 rounded-lg p-4">
              <div className="space-y-2">
                {players.map((player) => (
                  <div
                    key={player.userId}
                    className="p-3 bg-gray-800/90 rounded-lg flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                      <Image
                        src={player.avatar}
                        alt={player.username}
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className="text-white">{player.username}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Content */}
            <div className="col-span-5 rounded-lg p-4">{children}</div>

            {/* Chat */}
            <div className="col-span-4">
              <GameChat lobbyId={lobbyId} />
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-4 bg-gray-900/80 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <PlayerStatus player={currentPlayer} role={role} />
              <PlayerAbilities phase={phase} role={role} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

const getPhaseBackground = (phase: "day" | "night" | "voting") => {
  switch (phase) {
    case "day":
      return 'bg-[url("/images/rooms/day.webp")]';
    case "night":
      return 'bg-[url("/images/rooms/night.webp")]';
    case "voting":
      return 'bg-[url("/images/rooms/hall-1.webp")]';
  }
};
