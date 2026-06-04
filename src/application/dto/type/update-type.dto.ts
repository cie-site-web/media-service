import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export class UpdateTypeDto {
  @IsString()
  @IsNotEmpty()
  publicId!: string;

  @IsOptional()
  @IsEnum(TypeNameEnum)
  name?: TypeNameEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  format?: string;
}
