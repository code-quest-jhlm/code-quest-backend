import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsNumber, IsArray } from "class-validator";

export class CreateDrawDto {
  @ApiProperty()
  @IsString()
  readonly title: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsBoolean()
  readonly state: boolean

  @ApiProperty()
  @IsNumber()
  readonly totalWinners: number

  @ApiProperty()
  @IsArray()
  readonly awards: string[]
}
