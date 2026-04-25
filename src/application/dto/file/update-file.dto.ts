import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateFileDto {
  @IsString()
  @IsNotEmpty()
  publicId!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  path?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  typeId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  size?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  uploadedBy?: string;
}
