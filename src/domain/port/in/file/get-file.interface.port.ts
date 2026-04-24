import { FileEntity } from "src/domain/entities/file.entity";

export interface GetFileInterfacePort {
  execute(publicId: string): Promise<FileEntity>;
}
