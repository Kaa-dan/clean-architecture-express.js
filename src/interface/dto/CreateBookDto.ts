import { IsDate, IsString } from "class-validator";


export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsDate()
  publishedDate!: Date;
}