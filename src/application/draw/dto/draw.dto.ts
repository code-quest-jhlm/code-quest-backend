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
<<<<<<< HEAD
  @IsDateString()
  readonly drawDate: Date
=======
  @IsDate()
  @IsOptional()
  readonly drawDate?: Date
>>>>>>> develop

  @ApiProperty()
  @IsString()
  @IsOptional()
  state?: string

  @ApiProperty()
<<<<<<< HEAD
  @IsUUID()
  readonly idUser?: string

  @ApiProperty()
  @IsString()
  readonly idServer: string
=======
  @IsNumber()
  readonly idUser: number
>>>>>>> develop

  @ApiProperty()
  @IsArray()
  rewards?: RewardDTO[]

  constructor(
    id: string,
    title: string,
    description: string,
    creationDate: Date,
    drawDate: Date,
    state: string,
<<<<<<< HEAD
    idServer: string
=======
    idUser: number
>>>>>>> develop
  ) {
    this.id = id
    this.title = title
    this.drawDate = drawDate
    this.state = state
    this.description = description
    this.creationDate = creationDate
<<<<<<< HEAD
    this.idServer = idServer
=======
    this.idUser = idUser
>>>>>>> develop
  }
}
