import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class GetFileValidator {
  validate(publicId: string): void {
    if (!NANOID_REGEX.test(publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
  }
}
