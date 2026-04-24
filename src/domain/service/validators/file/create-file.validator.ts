import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateFileCommand } from "src/domain/port/in/file/create-file.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class CreateFileValidator {
  validate(command: CreateFileCommand): void {
    if (!command.name?.trim()) {
      throw new BusinessError(CodesError.FILE_NAME_REQUIRED);
    }
    if (!command.path?.trim()) {
      throw new BusinessError(CodesError.FILE_PATH_REQUIRED);
    }
    if (!NANOID_REGEX.test(command.typeId)) {
      throw new BusinessError(CodesError.FILE_TYPE_ID_INVALID);
    }
    if (command.size <= 0n) {
      throw new BusinessError(CodesError.FILE_SIZE_INVALID);
    }
    if (!command.uploadedBy?.trim()) {
      throw new BusinessError(CodesError.FILE_UPLOADED_BY_REQUIRED);
    }
  }
}
