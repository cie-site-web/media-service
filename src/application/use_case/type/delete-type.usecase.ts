import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteTypeInterfacePort } from "src/domain/port/in/type/delete-type.interface.port";
import { TypeRepositoryPort } from "src/domain/port/out/type.repository.port";
import { DeleteTypeValidator } from "src/domain/service/validators/type/delete-type.validator";

export class DeleteTypeUseCase implements DeleteTypeInterfacePort {
  constructor(
    private readonly repository: TypeRepositoryPort,
    private readonly validator: DeleteTypeValidator,
  ) {}

  async execute(publicId: string): Promise<void> {
    this.validator.validate(publicId);

    const existing = await this.repository.findByPublicId(publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.TYPE_NOT_FOUND);
    }

    await this.repository.delete(publicId);
  }
}
