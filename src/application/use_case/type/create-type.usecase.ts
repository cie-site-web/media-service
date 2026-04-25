import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TypeEntity } from "src/domain/entities/type.entity";
import {
  CreateTypeCommand,
  CreateTypeInterfacePort,
} from "src/domain/port/in/type/create-type.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { TypeRepositoryPort } from "src/domain/port/out/type.repository.port";
import { CreateTypeValidator } from "src/domain/service/validators/type/create-type.validator";

export class CreateTypeUseCase implements CreateTypeInterfacePort {
  constructor(
    private readonly repository: TypeRepositoryPort,
    private readonly validator: CreateTypeValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateTypeCommand): Promise<TypeEntity> {
    this.validator.validate(command);

    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) {
      throw new ApplicationError(CodesError.DUPLICATE_TYPE);
    }

    const entity = new TypeEntity({
      publicId,
      name: command.name,
      format: command.format,
    });

    return this.repository.save(entity);
  }
}
