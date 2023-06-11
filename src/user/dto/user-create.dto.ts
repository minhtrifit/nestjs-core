import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/models/role.enum';

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

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
