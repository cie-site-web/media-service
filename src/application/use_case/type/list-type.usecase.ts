import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TypeEntity } from "src/domain/entities/type.entity";
import {
  ListTypeInterfacePort,
  ListTypeQuery,
} from "src/domain/port/in/type/list-type.interface.port";
import { TypeRepositoryPort } from "src/domain/port/out/type.repository.port";
import { ListTypeValidator } from "src/domain/service/validators/type/list-type.validator";

export class ListTypeUseCase implements ListTypeInterfacePort {
  constructor(
    private readonly repository: TypeRepositoryPort,
    private readonly validator: ListTypeValidator,
  ) {}

  async execute(query: ListTypeQuery): Promise<PaginatedResponse<TypeEntity>> {
    this.validator.validate(query);

    const { data, total } = await this.repository.findWithPagination(query);
    const totalPages = Math.ceil(total / query.limit);

    return {
      data,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
  }
}
