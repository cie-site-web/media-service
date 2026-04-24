import { TypeEntity } from "src/domain/entities/type.entity";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatForName } from "src/domain/enums/format.enum";

export type CreateTypeCommand =
  | { name: TypeNameEnum.DOC; format: FormatForName<TypeNameEnum.DOC> }
  | {
      name: TypeNameEnum.IMAGE;
      format: FormatForName<TypeNameEnum.IMAGE>;
    }
  | {
      name: TypeNameEnum.VIDEO;
      format: FormatForName<TypeNameEnum.VIDEO>;
    };

export interface CreateTypeInterfacePort {
  execute(command: CreateTypeCommand): Promise<TypeEntity>;
}
