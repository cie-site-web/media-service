import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum } from "src/domain/enums/format.enum";

export interface ResponseTypeDto {
  publicId: string;
  name: TypeNameEnum;
  format: FormatEnum;
}
