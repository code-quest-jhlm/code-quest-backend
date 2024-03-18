import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

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
}
