import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateTypeCommand } from "src/domain/port/in/type/create-type.interface.port";
import { FormatPolicies } from "src/domain/service/policies/format.policies";
import { TypeNamePolicies } from "src/domain/service/policies/type-name.policies";

export class CreateTypeValidator {
  validate(command: CreateTypeCommand): void {
    if (!command.name) {
      throw new BusinessError(CodesError.TYPE_NAME_REQUIRED);
    }
    if (!TypeNamePolicies.isAllowed(command.name)) {
      throw new BusinessError(CodesError.TYPE_NAME_INVALID);
    }

    if (!FormatPolicies.isAllowedForName(command.name, command.format)) {
      throw new BusinessError(CodesError.TYPE_FORMAT_INVALID);
    }
  }
}
