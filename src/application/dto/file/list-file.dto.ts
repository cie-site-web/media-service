import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class ListFileDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  typeId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  uploadedBy?: string;
}
