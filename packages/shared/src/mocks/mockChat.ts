import { Message } from "@/types/game";
import { names } from "./mockPlayers";
const mockMessages: string[] = [
  "Hello, who is the killer?",
  "It's John",
  "No way, he is innocent",
  "I know, but he is the killer",
  "What do you mean?",
  "I am sure he is the killer",
  "Me too",
  "But no, I am not the killer",
];

export const mockChat: Message[] = mockMessages.map((message) => ({
  id: message,
  content: message,
  username: names[Math.floor(Math.random() * names.length)],
  timestamp: new Date().toISOString(),
}));
