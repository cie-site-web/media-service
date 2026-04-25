import { PaginatedResponseDto } from "src/application/dto/paginate/paginated-response.dto";
import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";

export class PaginatedResponseMapperDto {
  static toDto<TDomain, TDto>(
    page: PaginatedResponse<TDomain>,
    mapItem: (item: TDomain) => TDto,
  ): PaginatedResponseDto<TDto> {
    return {
      data: page.data.map(mapItem),
      total: page.total,
      page: page.page,
      limit: page.limit,
      totalPages: page.totalPages,
    };
  }
}
