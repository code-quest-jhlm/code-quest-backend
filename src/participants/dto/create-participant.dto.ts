import { IsString, MinLength, IsOptional } from "class-validator"

export class CreateParticipantDto {
  @IsString()
  @MinLength(1)
  discordId: string

  @IsString()
  @MinLength(1)
  name: string

  @IsString()
  @MinLength(1)
  @IsOptional()
  avatar: string
}
