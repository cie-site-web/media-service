import { Injectable } from '@nestjs/common';
import { FileBdMapper } from 'src/application/mapper/file/file-bd.mapper';
import { FileEntity } from 'src/domain/entities/file.entity';
import { ListFileQuery } from 'src/domain/port/in/file/list-file.interface.port';
import { FileRepositoryPort } from 'src/domain/port/out/file.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class FileRepositoryAdapter implements FileRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: FileEntity): Promise<FileEntity> {
    const data = FileBdMapper.toPersistence(entity);
    const saved = await this.prisma.fileTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return FileBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<FileEntity | null> {
    const entity = await this.prisma.fileTable.findUnique({
      where: { id },
    });

    return entity ? FileBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<FileEntity | null> {
    const entity = await this.prisma.fileTable.findUnique({
      where: { public_id: publicId },
    });

    return entity ? FileBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListFileQuery,
  ): Promise<{ data: FileEntity[]; total: number }> {
    const { page, limit, typeId, uploadedBy } = query;
    const where: Record<string, unknown> = {};

    if (typeId) {
      where.type_id = typeId;
    }
    if (uploadedBy) {
      where.uploaded_by = {
        contains: uploadedBy,
        mode: 'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.fileTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.fileTable.count({ where }),
    ]);

    return { data: data.map(FileBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.fileTable.delete({
      where: { public_id: publicId },
    });
  }
}
