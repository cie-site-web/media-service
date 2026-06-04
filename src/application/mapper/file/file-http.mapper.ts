import { CreateFileDto } from "src/application/dto/file/create-file.dto";
import { GetFileDto } from "src/application/dto/file/get-file.dto";
import { ListFileDto } from "src/application/dto/file/list-file.dto";
import { ResponseFileDto } from "src/application/dto/file/response-file.dto";
import { UpdateFileDto } from "src/application/dto/file/update-file.dto";
import { FileEntity } from "src/domain/entities/file.entity";
import { CreateFileCommand } from "src/domain/port/in/file/create-file.interface.port";
import { ListFileQuery } from "src/domain/port/in/file/list-file.interface.port";
import { UpdateFileCommand } from "src/domain/port/in/file/update-file.interface.port";

export class FileHttpMapper {
  static toCreateCommand(dto: CreateFileDto): CreateFileCommand {
    return {
      name: dto.name,
      path: dto.path,
      typeId: dto.typeId,
      size: BigInt(dto.size),
      uploadedBy: dto.uploadedBy,
    };
  }

  static toUpdateCommand(dto: UpdateFileDto): UpdateFileCommand {
    return {
      publicId: dto.publicId,
      name: dto.name,
      path: dto.path,
      typeId: dto.typeId,
      size: dto.size !== undefined ? BigInt(dto.size) : undefined,
      uploadedBy: dto.uploadedBy,
    };
  }

  static toGetPublicId(dto: GetFileDto): string {
    return dto.publicId;
  }

  static toListQuery(dto: ListFileDto): ListFileQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      typeId: dto.typeId,
      uploadedBy: dto.uploadedBy,
    };
  }

  static toResponse(entity: FileEntity): ResponseFileDto {
    return {
      id: entity.id ?? "",
      publicId: entity.publicId,
      name: entity.name,
      path: entity.path,
      typeId: entity.typeId,
      size: entity.size.toString(),
      uploadedBy: entity.uploadedBy,
      createdAt: entity.createdAt?.toISOString(),
    };
  }
}
