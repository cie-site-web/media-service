import { FormatDocEnum } from "src/domain/enums/format-doc.enum";
import { FormatImageEnum } from "src/domain/enums/format-image.enum";
import { FormatVideoEnum } from "src/domain/enums/format-video.enum";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export type FormatEnum = FormatDocEnum | FormatImageEnum | FormatVideoEnum;

export type FormatByNameMap = {
  [TypeNameEnum.DOC]: FormatDocEnum;
  [TypeNameEnum.IMAGE]: FormatImageEnum;
  [TypeNameEnum.VIDEO]: FormatVideoEnum;
};

export type FormatForName<N extends TypeNameEnum> = FormatByNameMap[N];
