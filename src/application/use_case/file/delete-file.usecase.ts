import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteFileInterfacePort } from "src/domain/port/in/file/delete-file.interface.port";
import { FileRepositoryPort } from "src/domain/port/out/file.repository.port";
import { DeleteFileValidator } from "src/domain/service/validators/file/delete-file.validator";

export class DeleteFileUseCase implements DeleteFileInterfacePort {
  constructor(
    private readonly repository: FileRepositoryPort,
    private readonly validator: DeleteFileValidator,
  ) {}

  async execute(publicId: string): Promise<void> {
    this.validator.validate(publicId);

    const existing = await this.repository.findByPublicId(publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.FILE_NOT_FOUND);
    }

    await this.repository.delete(publicId);
  }
}
