import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan } from "typeorm";
import { Lobby } from "./lobby.entity";
import { CreateLobbyDto } from "./dto/create-lobby.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private lobbyRepository: Repository<Lobby>,
    private userService: UserService
  ) {
    // Clean up empty lobbies every minute
    setInterval(() => this.cleanupEmptyLobbies(), 60000);
  }

  async create(createLobbyDto: CreateLobbyDto, userInfo: { userId: number }) {
    const user = await this.userService.findById(userInfo.userId);
    if (!user) throw new NotFoundException("User not found");

    const lobby = this.lobbyRepository.create({
      ...createLobbyDto,
      players: [user],
    });
    return this.lobbyRepository.save(lobby);
  }

  async findAll() {
    return this.lobbyRepository.find({
      relations: ["players"],
    });
  }

  async findOne(id: string) {
    const lobby = await this.lobbyRepository.findOne({
      where: { id },
      relations: ["players"],
    });

    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    return lobby;
  }

  async join(id: string, userInfo: { userId: number }) {
    const user = await this.userService.findById(userInfo.userId);
    if (!user) throw new NotFoundException("User not found");

    const lobby = await this.findOne(id);

    if (lobby.players.length >= lobby.maxPlayers) {
      throw new Error("Lobby is full");
    }

    if (lobby.players.some((player) => player.id === user.id)) {
      return this.lobbyRepository.save(lobby);
    }

    lobby.players.push(user);
    lobby.lastEmptyAt = null;

    return this.lobbyRepository.save(lobby);
  }

  async leave(id: string, userId: number) {
    const lobby = await this.findOne(id);

    lobby.players = lobby.players.filter((player) => player.id !== userId);

    if (lobby.players.length === 0) {
      lobby.lastEmptyAt = new Date();
    }

    return this.lobbyRepository.save(lobby);
  }

  private async cleanupEmptyLobbies() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    await this.lobbyRepository.delete({
      lastEmptyAt: LessThan(fiveMinutesAgo),
    });
  }
}
