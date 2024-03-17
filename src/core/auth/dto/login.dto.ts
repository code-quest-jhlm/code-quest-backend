import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string
}
