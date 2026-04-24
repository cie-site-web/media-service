import { FileEntity } from "src/domain/entities/file.entity";
import { ListFileQuery } from "src/domain/port/in/file/list-file.interface.port";

export interface FileRepositoryPort {
  save(entity: FileEntity): Promise<FileEntity>;
  findById(id: string): Promise<FileEntity | null>;
  findByPublicId(publicId: string): Promise<FileEntity | null>;
  findWithPagination(
    query: ListFileQuery,
  ): Promise<{ data: FileEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
