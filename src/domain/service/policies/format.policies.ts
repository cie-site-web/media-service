import { FormatDocEnum } from "src/domain/enums/format-doc.enum";
import { FormatImageEnum } from "src/domain/enums/format-image.enum";
import { FormatVideoEnum } from "src/domain/enums/format-video.enum";
import { FormatEnum } from "src/domain/enums/format.enum";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export class FormatPolicies {
  static readonly allowedFormats: FormatEnum[] = [
    ...Object.values(FormatDocEnum),
    ...Object.values(FormatImageEnum),
    ...Object.values(FormatVideoEnum),
  ];

  static isAllowed(format: string): boolean {
    return this.allowedFormats.includes(format.toLowerCase() as FormatEnum);
  }

  static isAllowedForName(name: TypeNameEnum, format: string): boolean {
    const value = format.toLowerCase();
    switch (name) {
      case TypeNameEnum.DOC:
        return Object.values(FormatDocEnum).includes(value as FormatDocEnum);
      case TypeNameEnum.IMAGE:
        return Object.values(FormatImageEnum).includes(value as FormatImageEnum);
      case TypeNameEnum.VIDEO:
        return Object.values(FormatVideoEnum).includes(value as FormatVideoEnum);
      default:
        return false;
    }
  }
}
