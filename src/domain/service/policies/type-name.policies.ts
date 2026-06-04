import { TypeNameEnum } from "src/domain/enums/type-name.enum";

export class TypeNamePolicies {
  static readonly allowedNames: string[] = Object.values(TypeNameEnum);

  static isAllowed(name: string): boolean {
    return this.allowedNames.includes(name.toLowerCase());
  }
}
