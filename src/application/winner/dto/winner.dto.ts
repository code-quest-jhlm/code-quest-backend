import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUUID, IsNumber } from 'class-validator'

export class WinnerDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @ApiProperty()
  @IsNumber()
  readonly idDiscord: number

  @ApiProperty()
  @IsUUID()
  readonly idDraw: string

  @ApiProperty()
  @IsUUID()
  readonly idReward: string

  constructor(id: string, idDiscord: number, idDraw: string, idReward: string) {
    this.id = id
    this.idDiscord = idDiscord
    this.idDraw = idDraw
    this.idReward = idReward
  }
}
