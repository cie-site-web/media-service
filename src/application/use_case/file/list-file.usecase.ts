import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { FileEntity } from "src/domain/entities/file.entity";
import {
  ListFileInterfacePort,
  ListFileQuery,
} from "src/domain/port/in/file/list-file.interface.port";
import { FileRepositoryPort } from "src/domain/port/out/file.repository.port";
import { ListFileValidator } from "src/domain/service/validators/file/list-file.validator";

export class ListFileUseCase implements ListFileInterfacePort {
  constructor(
    private readonly repository: FileRepositoryPort,
    private readonly validator: ListFileValidator,
  ) {}

  async execute(query: ListFileQuery): Promise<PaginatedResponse<FileEntity>> {
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
