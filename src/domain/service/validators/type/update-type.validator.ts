import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateTypeCommand } from "src/domain/port/in/type/update-type.interface.port";
import { FormatPolicies } from "src/domain/service/policies/format.policies";
import { TypeNamePolicies } from "src/domain/service/policies/type-name.policies";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class UpdateTypeValidator {
  validate(command: UpdateTypeCommand): void {
    if (!NANOID_REGEX.test(command.publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
    if (command.name !== undefined && !command.name) {
      throw new BusinessError(CodesError.TYPE_NAME_REQUIRED);
    }
    if (command.name !== undefined && !TypeNamePolicies.isAllowed(command.name)) {
      throw new BusinessError(CodesError.TYPE_NAME_INVALID);
    }
    if (
      command.name !== undefined &&
      command.format !== undefined &&
      !FormatPolicies.isAllowedForName(command.name, command.format)
    ) {
      throw new BusinessError(CodesError.TYPE_FORMAT_INVALID);
    }
    if (
      command.name === undefined &&
      command.format !== undefined &&
      !FormatPolicies.isAllowed(command.format)
    ) {
      throw new BusinessError(CodesError.TYPE_FORMAT_INVALID);
    }
  }
}
