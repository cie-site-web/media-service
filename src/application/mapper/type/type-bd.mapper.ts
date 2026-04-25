import { TypeEntity } from "src/domain/entities/type.entity";
import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum } from "src/domain/enums/format.enum";

type TypePersistence = {
  id?: string;
  public_id: string;
  name: string;
  format: string;
  created_at?: Date;
};

export class TypeBdMapper {
  static toDomain(persistence: TypePersistence): TypeEntity {
    return new TypeEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      name: persistence.name as TypeNameEnum,
      format: persistence.format as FormatEnum,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: TypeEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      format: entity.format,
    };
  }
}
