import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class ParticipantDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @ApiProperty()
  @IsString()
  readonly fullName: string

  @ApiProperty()
  @IsNumber()
  readonly idDiscord: number

  @ApiProperty()
  @IsString()
  readonly idDraw: string

  constructor(id: string, fullName: string, idDiscord: number, idDraw: string) {
    this.id = id
    this.fullName = fullName
    this.idDiscord = idDiscord
    this.idDraw = idDraw
  }
}
