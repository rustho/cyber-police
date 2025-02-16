import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, Length, IsNotEmpty } from 'class-validator';

export class CreateLobbyDto {
  @ApiProperty({
    example: 'Cyber Detective Room',
    description: 'The name of the lobby',
    minLength: 3,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, { message: 'Lobby name must be between 3 and 50 characters' })
  name!: string;

  @ApiProperty({
    example: 8,
    description: 'Maximum number of players allowed in the lobby',
    minimum: 2,
    maximum: 15,
    default: 8
  })
  @IsNumber()
  @Min(2, { message: 'Minimum 2 players required' })
  @Max(15, { message: 'Maximum 15 players allowed' })
  maxPlayers!: number;
}

// Response DTO for better Swagger documentation
export class LobbyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  maxPlayers!: number;

  @ApiProperty({ type: [String] })
  players!: string[];

  @ApiProperty()
  gameStarted!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ required: false })
  lastEmptyAt?: Date;
} 