import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { FileEntity } from "src/domain/entities/file.entity";
import { GetFileInterfacePort } from "src/domain/port/in/file/get-file.interface.port";
import { FileRepositoryPort } from "src/domain/port/out/file.repository.port";
import { GetFileValidator } from "src/domain/service/validators/file/get-file.validator";

export class GetFileUseCase implements GetFileInterfacePort {
  constructor(
    private readonly repository: FileRepositoryPort,
    private readonly validator: GetFileValidator,
  ) {}

  async execute(publicId: string): Promise<FileEntity> {
    this.validator.validate(publicId);

    const existing = await this.repository.findByPublicId(publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.FILE_NOT_FOUND);
    }

    return existing;
  }
}
