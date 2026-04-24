export interface DeleteFileInterfacePort {
  execute(publicId: string): Promise<void>;
}
