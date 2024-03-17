import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class ParticipantDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @ApiProperty()
  @IsString()
  readonly fullName: string

  @ApiProperty()
  @IsString()
  readonly idDiscord: string

  @ApiProperty()
  @IsString()
  readonly idDraw: string

  constructor(id: string, fullName: string, idDiscord: string, idDraw: string) {
    this.id = id
    this.fullName = fullName
    this.idDiscord = idDiscord
    this.idDraw = idDraw
  }
}
