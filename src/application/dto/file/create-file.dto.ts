import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  @IsNotEmpty()
  typeId!: string;

  @IsNumber()
  @Min(1)
  size!: number;

  @IsString()
  @IsNotEmpty()
  uploadedBy!: string;
}
