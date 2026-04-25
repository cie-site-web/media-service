import { FileEntity } from "src/domain/entities/file.entity";

type FilePersistence = {
  id?: string;
  public_id: string;
  name: string;
  path: string;
  type_id: string;
  size: bigint | number | string;
  uploaded_by: string;
  created_at?: Date;
};

export class FileBdMapper {
  static toDomain(persistence: FilePersistence): FileEntity {
    return new FileEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      name: persistence.name,
      path: persistence.path,
      typeId: persistence.type_id,
      size: BigInt(persistence.size),
      uploadedBy: persistence.uploaded_by,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: FileEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      path: entity.path,
      type_id: entity.typeId,
      size: entity.size,
      uploaded_by: entity.uploadedBy,
    };
  }
}
