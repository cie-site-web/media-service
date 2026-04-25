import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TypeEntity } from "src/domain/entities/type.entity";
import {
  UpdateTypeCommand,
  UpdateTypeInterfacePort,
} from "src/domain/port/in/type/update-type.interface.port";
import { TypeRepositoryPort } from "src/domain/port/out/type.repository.port";
import { UpdateTypeValidator } from "src/domain/service/validators/type/update-type.validator";

export class UpdateTypeUseCase implements UpdateTypeInterfacePort {
  constructor(
    private readonly repository: TypeRepositoryPort,
    private readonly validator: UpdateTypeValidator,
  ) {}

  async execute(command: UpdateTypeCommand): Promise<TypeEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByPublicId(command.publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.TYPE_NOT_FOUND);
    }

    existing.update({
      name: command.name,
      format: command.format,
    });

    return this.repository.save(existing);
  }
}
