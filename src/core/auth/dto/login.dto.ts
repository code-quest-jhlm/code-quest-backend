import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  username: string

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  password: string
}
