import { FileEntity } from "src/domain/entities/file.entity";

export interface UpdateFileCommand {
  publicId: string;
  name?: string;
  path?: string;
  typeId?: string;
  size?: bigint;
  uploadedBy?: string;
}

export interface UpdateFileInterfacePort {
  execute(command: UpdateFileCommand): Promise<FileEntity>;
}
