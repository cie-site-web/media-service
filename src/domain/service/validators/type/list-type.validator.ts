import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListTypeQuery } from "src/domain/port/in/type/list-type.interface.port";
import { FormatPolicies } from "src/domain/service/policies/format.policies";
import { TypeNamePolicies } from "src/domain/service/policies/type-name.policies";

export class ListTypeValidator {
  validate(query: ListTypeQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) {
      throw new BusinessError(CodesError.PAGE_INVALID);
    }
    if (!Number.isInteger(query.limit) || query.limit <= 0) {
      throw new BusinessError(CodesError.LIMIT_INVALID);
    }
    if (query.name !== undefined && !query.name) {
      throw new BusinessError(CodesError.TYPE_NAME_REQUIRED);
    }
    if (query.name !== undefined && !TypeNamePolicies.isAllowed(query.name)) {
      throw new BusinessError(CodesError.TYPE_NAME_INVALID);
    }
    if (
      query.name !== undefined &&
      query.format !== undefined &&
      !FormatPolicies.isAllowedForName(query.name, query.format)
    ) {
      throw new BusinessError(CodesError.TYPE_FORMAT_INVALID);
    }
    if (
      query.name === undefined &&
      query.format !== undefined &&
      !FormatPolicies.isAllowed(query.format)
    ) {
      throw new BusinessError(CodesError.TYPE_FORMAT_INVALID);
    }
  }
}
