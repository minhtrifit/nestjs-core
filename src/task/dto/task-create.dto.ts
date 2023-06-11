import { IsNotEmpty, IsString, IsBoolean, MinLength } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
