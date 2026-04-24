import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TypeEntity } from "src/domain/entities/type.entity";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum } from "src/domain/enums/format.enum";
import { FormatDocEnum } from "src/domain/enums/format-doc.enum";
import { FormatImageEnum } from "src/domain/enums/format-image.enum";
import { FormatVideoEnum } from "src/domain/enums/format-video.enum";

type ListTypeFilters =
  | { name?: undefined; format?: FormatEnum }
  | { name: TypeNameEnum.DOC; format?: FormatDocEnum }
  | { name: TypeNameEnum.IMAGE; format?: FormatImageEnum }
  | { name: TypeNameEnum.VIDEO; format?: FormatVideoEnum };

export type ListTypeQuery = ListTypeFilters & {
  page: number;
  limit: number;
};

export interface ListTypeInterfacePort {
  execute(query: ListTypeQuery): Promise<PaginatedResponse<TypeEntity>>;
}
