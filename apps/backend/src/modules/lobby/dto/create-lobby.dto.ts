import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateLobbyDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(2)
  @Max(15)
  maxPlayers!: number;
} 