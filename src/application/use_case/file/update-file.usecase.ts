import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { FileEntity } from "src/domain/entities/file.entity";
import {
  UpdateFileCommand,
  UpdateFileInterfacePort,
} from "src/domain/port/in/file/update-file.interface.port";
import { FileRepositoryPort } from "src/domain/port/out/file.repository.port";
import { UpdateFileValidator } from "src/domain/service/validators/file/update-file.validator";

export class UpdateFileUseCase implements UpdateFileInterfacePort {
  constructor(
    private readonly repository: FileRepositoryPort,
    private readonly validator: UpdateFileValidator,
  ) {}

  async execute(command: UpdateFileCommand): Promise<FileEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByPublicId(command.publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.FILE_NOT_FOUND);
    }

    existing.update({
      name: command.name,
      path: command.path,
      typeId: command.typeId,
      size: command.size,
      uploadedBy: command.uploadedBy,
    });

    return this.repository.save(existing);
  }
}
