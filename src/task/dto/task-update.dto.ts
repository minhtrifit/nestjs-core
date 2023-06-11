import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  IsNumber,
} from 'class-validator';

export class updateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
