import { FileEntity } from "src/domain/entities/file.entity";

export interface CreateFileCommand {
  name: string;
  path: string;
  typeId: string;
  size: bigint;
  uploadedBy: string;
}

export interface CreateFileInterfacePort {
  execute(command: CreateFileCommand): Promise<FileEntity>;
}
