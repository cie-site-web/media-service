export interface FileProps {
  readonly id?: string;
  publicId: string;
  name: string;
  path: string;
  typeId: string;
  size: bigint;
  uploadedBy: string;
  readonly createdAt?: Date;
}

export class FileEntity {
  constructor(private readonly props: FileProps) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get publicId(): string {
    return this.props.publicId;
  }

  get name(): string {
    return this.props.name;
  }

  get path(): string {
    return this.props.path;
  }

  get typeId(): string {
    return this.props.typeId;
  }

  get size(): bigint {
    return this.props.size;
  }

  get uploadedBy(): string {
    return this.props.uploadedBy;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<FileProps>): FileEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
