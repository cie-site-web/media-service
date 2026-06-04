import { CreateTypeDto } from "src/application/dto/type/create-type.dto";
import { GetTypeDto } from "src/application/dto/type/get-type.dto";
import { ListTypeDto } from "src/application/dto/type/list-type.dto";
import { ResponseTypeDto } from "src/application/dto/type/response-type.dto";
import { UpdateTypeDto } from "src/application/dto/type/update-type.dto";
import { TypeEntity } from "src/domain/entities/type.entity";
import { CreateTypeCommand } from "src/domain/port/in/type/create-type.interface.port";
import { ListTypeQuery } from "src/domain/port/in/type/list-type.interface.port";
import { UpdateTypeCommand } from "src/domain/port/in/type/update-type.interface.port";

export class TypeHttpMapper {
  static toCreateCommand(dto: CreateTypeDto): CreateTypeCommand {
    return {
      name: dto.name,
      format: dto.format as CreateTypeCommand["format"],
    } as CreateTypeCommand;
  }

  static toUpdateCommand(dto: UpdateTypeDto): UpdateTypeCommand {
    return {
      publicId: dto.publicId,
      name: dto.name,
      format: dto.format as UpdateTypeCommand["format"],
    } as UpdateTypeCommand;
  }

  static toGetPublicId(dto: GetTypeDto): string {
    return dto.publicId;
  }

  static toListQuery(dto: ListTypeDto): ListTypeQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      name: dto.name,
      format: dto.format as ListTypeQuery["format"],
    } as ListTypeQuery;
  }

  static toResponse(entity: TypeEntity): ResponseTypeDto {
    return {
      id: entity.id ?? "",
      publicId: entity.publicId,
      name: entity.name,
      format: entity.format,
    };
  }
}
