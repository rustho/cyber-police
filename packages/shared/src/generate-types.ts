import { paths, components } from "./api-types";

// Request types
export type CreateLobbyRequest =
  paths["/lobbies"]["post"]["requestBody"]["content"]["application/json"];
export type JoinLobbyRequest =
  paths["/lobbies/{id}/join"]["post"]["parameters"]["path"];

// Response types
export type LobbyResponse = components["schemas"]["LobbyResponseDto"];
export type LobbiesResponse = components["schemas"]["LobbyResponseDto"][];

export type UserResponse = {
  userId: number;
  username: string;
  avatar: string;
  isHost: boolean;
};

// ... other types you need
