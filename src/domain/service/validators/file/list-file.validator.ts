import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListFileQuery } from "src/domain/port/in/file/list-file.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class ListFileValidator {
  validate(query: ListFileQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) {
      throw new BusinessError(CodesError.PAGE_INVALID);
    }
    if (!Number.isInteger(query.limit) || query.limit <= 0) {
      throw new BusinessError(CodesError.LIMIT_INVALID);
    }
    if (query.typeId !== undefined && !NANOID_REGEX.test(query.typeId)) {
      throw new BusinessError(CodesError.FILE_TYPE_ID_INVALID);
    }
    if (query.uploadedBy !== undefined && !query.uploadedBy.trim()) {
      throw new BusinessError(CodesError.FILE_UPLOADED_BY_REQUIRED);
    }
  }
}
