import { Contains, IsNotEmpty, Length } from 'class-validator';

export class Bookmark {
  @IsNotEmpty()
  @Length(3, 20)
  title: string;
  @IsNotEmpty()
  @Contains('http://')
  link: string;
  @IsNotEmpty()
  @Length(5, 80)
  description: string;
  userId: number;
}
