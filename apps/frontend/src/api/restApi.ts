import { Lobby } from "../types";

export class GameApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";
  }

  async getLobbies(): Promise<Record<string, Lobby>> {
    const response = await fetch(`${this.baseUrl}/api/lobbies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getLobby(id: string): Promise<Lobby> {
    const response = await fetch(`${this.baseUrl}/api/lobbies/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export const gameApi = new GameApi(); 