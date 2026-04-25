import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { FileEntity } from "src/domain/entities/file.entity";
import {
  CreateFileCommand,
  CreateFileInterfacePort,
} from "src/domain/port/in/file/create-file.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { FileRepositoryPort } from "src/domain/port/out/file.repository.port";
import { CreateFileValidator } from "src/domain/service/validators/file/create-file.validator";

export class CreateFileUseCase implements CreateFileInterfacePort {
  constructor(
    private readonly repository: FileRepositoryPort,
    private readonly validator: CreateFileValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateFileCommand): Promise<FileEntity> {
    this.validator.validate(command);

    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) {
      throw new ApplicationError(CodesError.DUPLICATE_FILE);
    }

    const entity = new FileEntity({
      publicId,
      name: command.name,
      path: command.path,
      typeId: command.typeId,
      size: command.size,
      uploadedBy: command.uploadedBy,
    });

    return this.repository.save(entity);
  }
}
