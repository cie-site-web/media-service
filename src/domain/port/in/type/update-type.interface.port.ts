import { TypeEntity } from "src/domain/entities/type.entity";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum } from "src/domain/enums/format.enum";
import { FormatDocEnum } from "src/domain/enums/format-doc.enum";
import { FormatImageEnum } from "src/domain/enums/format-image.enum";
import { FormatVideoEnum } from "src/domain/enums/format-video.enum";

type UpdateTypePayload =
  | { name?: undefined; format?: FormatEnum }
  | { name: TypeNameEnum.DOC; format?: FormatDocEnum }
  | { name: TypeNameEnum.IMAGE; format?: FormatImageEnum }
  | { name: TypeNameEnum.VIDEO; format?: FormatVideoEnum };

export type UpdateTypeCommand = UpdateTypePayload & {
  publicId: string;
};

export interface UpdateTypeInterfacePort {
  execute(command: UpdateTypeCommand): Promise<TypeEntity>;
}
