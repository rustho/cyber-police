import axiosClient from "../axiosClient";
import {
  LobbiesResponse,
  LobbyResponse,
} from "@cyber-police/shared/src/generate-types";

export const gameService = {
  getLobbies: async (): Promise<LobbiesResponse> => {
    const { data } = await axiosClient.get("lobbies");
    return data;
  },

  getLobby: async (id: string): Promise<LobbyResponse> => {
    const { data } = await axiosClient.get(`lobbies/${id}`);
    return data;
  },

  createLobby: async (data: {
    name: string;
    maxPlayers: number;
  }): Promise<LobbyResponse> => {
    const { data: response } = await axiosClient.post("/lobbies", data);
    return response;
  },

  joinLobby: async (lobbyId: string): Promise<void> => {
    await axiosClient.post(`/lobbies/${lobbyId}/join`);
  },

  leaveLobby: async (lobbyId: string): Promise<void> => {
    await axiosClient.post(`/lobbies/${lobbyId}/leave`);
  },
};
