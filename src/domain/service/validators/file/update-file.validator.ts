import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateFileCommand } from "src/domain/port/in/file/update-file.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class UpdateFileValidator {
  validate(command: UpdateFileCommand): void {
    if (!NANOID_REGEX.test(command.publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
    if (command.name !== undefined && !command.name.trim()) {
      throw new BusinessError(CodesError.FILE_NAME_REQUIRED);
    }
    if (command.path !== undefined && !command.path.trim()) {
      throw new BusinessError(CodesError.FILE_PATH_REQUIRED);
    }
    if (command.typeId !== undefined && !NANOID_REGEX.test(command.typeId)) {
      throw new BusinessError(CodesError.FILE_TYPE_ID_INVALID);
    }
    if (command.size !== undefined && command.size <= 0n) {
      throw new BusinessError(CodesError.FILE_SIZE_INVALID);
    }
    if (command.uploadedBy !== undefined && !command.uploadedBy.trim()) {
      throw new BusinessError(CodesError.FILE_UPLOADED_BY_REQUIRED);
    }
  }
}
