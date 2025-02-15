"use client";

import { Player } from "@/types/lobby";
import { useTranslations } from "next-intl";

interface PlayerListProps {
  players: Player[];
}

export const PlayerList = ({ players }: PlayerListProps) => {
  const t = useTranslations();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{t("game.players")}</h2>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.userId}
            className="flex items-center justify-between p-3 bg-gray-700 
              rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span>{player.username}</span>
            {player.isHost && (
              <span className="text-sm px-2 py-1 bg-blue-600 rounded-full">
                {t("game.host")}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
