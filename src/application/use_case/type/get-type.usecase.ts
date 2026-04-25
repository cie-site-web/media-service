import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TypeEntity } from "src/domain/entities/type.entity";
import { GetTypeInterfacePort } from "src/domain/port/in/type/get-type.interface.port";
import { TypeRepositoryPort } from "src/domain/port/out/type.repository.port";
import { GetTypeValidator } from "src/domain/service/validators/type/get-type.validator";

export class GetTypeUseCase implements GetTypeInterfacePort {
  constructor(
    private readonly repository: TypeRepositoryPort,
    private readonly validator: GetTypeValidator,
  ) {}

  async execute(publicId: string): Promise<TypeEntity> {
    this.validator.validate(publicId);

    const existing = await this.repository.findByPublicId(publicId);
    if (!existing) {
      throw new ApplicationError(CodesError.TYPE_NOT_FOUND);
    }

    return existing;
  }
}
