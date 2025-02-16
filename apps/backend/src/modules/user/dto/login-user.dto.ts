import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "JohnDoe", description: "The username of the user" })
  @IsString()
  username!: string;

  @ApiProperty({
    example: "password123",
    description: "The password of the user",
  })
  @IsString()
  password!: string;
}
