import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export class ListTypeDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;

  @IsOptional()
  @IsEnum(TypeNameEnum)
  name?: TypeNameEnum;

  @IsOptional()
  @IsString()
  format?: string;
}
