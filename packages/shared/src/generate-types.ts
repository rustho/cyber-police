import { paths, components } from "./api-types";

// Request types
export type CreateLobbyRequest =
  paths["/lobbies"]["post"]["requestBody"]["content"]["application/json"];
export type JoinLobbyRequest =
  paths["/lobbies/{id}/join"]["post"]["parameters"]["path"];

// Response types
export type LobbyResponse = components["schemas"]["LobbyResponseDto"];
export type LobbiesResponse = components["schemas"]["LobbyResponseDto"][];

// ... other types you need
