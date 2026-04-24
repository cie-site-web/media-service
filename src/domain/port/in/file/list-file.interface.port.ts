import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { FileEntity } from "src/domain/entities/file.entity";

export interface ListFileQuery {
  page: number;
  limit: number;
  typeId?: string;
  uploadedBy?: string;
}

export interface ListFileInterfacePort {
  execute(query: ListFileQuery): Promise<PaginatedResponse<FileEntity>>;
}
