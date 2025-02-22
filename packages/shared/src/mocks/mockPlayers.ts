import { Player } from "@/types/lobby";

export const names = ["John", "Jane", "Smith", "Doe"];
const lastNames = ["Smith", "Doe", "Johnson", "Williams"];
export const avatars = [
  "/images/avatars/avatar-1.webp",
  "/images/avatars/avatar-2.webp",
  "/images/avatars/avatar-3.webp",
  "/images/avatars/avatar-4.webp",
];

const createMockPlayer = (userId: number): Player => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  return {
    userId,
    username: `${randomName} ${randomLastName}`,
    avatar: randomAvatar,
    isHost: false,
  };
};

export const mockPlayers = Array.from({ length: 8 }, (_, i) =>
  createMockPlayer(i + 1)
);
