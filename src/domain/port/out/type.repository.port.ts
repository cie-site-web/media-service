import { TypeEntity } from "src/domain/entities/type.entity";
import { ListTypeQuery } from "src/domain/port/in/type/list-type.interface.port";

export interface TypeRepositoryPort {
  save(entity: TypeEntity): Promise<TypeEntity>;
  findById(id: string): Promise<TypeEntity | null>;
  findByPublicId(publicId: string): Promise<TypeEntity | null>;
  findWithPagination(
    query: ListTypeQuery,
  ): Promise<{ data: TypeEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
