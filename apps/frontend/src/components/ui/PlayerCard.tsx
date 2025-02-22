import { Player } from "@/types/lobby";
import Image from "next/image";
interface PlayerCardProps {
  player: Player;
  onClick: () => void;
}

export const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-2 bg-gray-900/80 rounded-lg p-2 cursor-pointer"
    >
      <div>
        <Image
          src={player.avatar}
          alt={player.username}
          width={80}
          height={80}
        />
      </div>
      <div className="text-white">{player.username}</div>
    </div>
  );
};
