import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator'

export class DrawDTO {
  @ApiProperty()
  @IsUUID()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly title: string

  @ApiProperty()
  @IsDate()
  readonly drawDate: Date

  @ApiProperty()
  @IsString()
  readonly state: string

  constructor(id: string, title: string, drawDate: Date, state: string) {
    this.id = id
    this.title = title
    this.drawDate = drawDate
    this.state = state
  }
}

export class DrawCRUDDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @ApiProperty()
  @IsString()
  readonly title: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsDate()
  @IsOptional()
  readonly creationDate?: Date

  @ApiProperty()
  @IsDate()
  @IsOptional()
  readonly drawDate?: Date

  @ApiProperty()
  @IsString()
  readonly state: string

  @ApiProperty()
  @IsNumber()
  readonly idUser: number

  @ApiProperty()
  @IsString()
  readonly idServer: string

  constructor(
    id: string,
    title: string,
    description: string,
    creationDate: Date,
    drawDate: Date,
    state: string,
    idUser: number,
    idServer: string
  ) {
    this.id = id
    this.title = title
    this.drawDate = drawDate
    this.state = state
    this.description = description
    this.creationDate = creationDate
    this.idUser = idUser
    this.idServer = idServer
  }
}
