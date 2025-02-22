import { Player } from "@/types/lobby";

interface PlayerStatusProps {
  player: Player;
  role: string;
}

export const PlayerStatus = ({ player, role }: PlayerStatusProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-700" />{" "}
      {/* Avatar placeholder */}
      <div>
        <h3 className="text-white font-bold">{player.username}</h3>
        <p className="text-gray-300">{role}</p>
      </div>
    </div>
  );
};
