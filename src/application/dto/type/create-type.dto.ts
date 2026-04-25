import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export class CreateTypeDto {
  @IsEnum(TypeNameEnum)
  name!: TypeNameEnum;

  @IsString()
  @IsNotEmpty()
  format!: string;
}
