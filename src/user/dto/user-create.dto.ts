import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  email: string;
}
