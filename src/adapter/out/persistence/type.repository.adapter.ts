import { Injectable } from '@nestjs/common';
import { TypeBdMapper } from 'src/application/mapper/type/type-bd.mapper';
import { TypeEntity } from 'src/domain/entities/type.entity';
import { ListTypeQuery } from 'src/domain/port/in/type/list-type.interface.port';
import { TypeRepositoryPort } from 'src/domain/port/out/type.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class TypeRepositoryAdapter implements TypeRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: TypeEntity): Promise<TypeEntity> {
    const data = TypeBdMapper.toPersistence(entity);
    const saved = await this.prisma.typeTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return TypeBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<TypeEntity | null> {
    const entity = await this.prisma.typeTable.findUnique({
      where: { id },
    });

    return entity ? TypeBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<TypeEntity | null> {
    const entity = await this.prisma.typeTable.findUnique({
      where: { public_id: publicId },
    });

    return entity ? TypeBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListTypeQuery,
  ): Promise<{ data: TypeEntity[]; total: number }> {
    const { page, limit, name, format } = query;
    const where: Record<string, unknown> = {};

    if (name) {
      where.name = name;
    }
    if (format) {
      where.format = format;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.typeTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.typeTable.count({ where }),
    ]);

    return { data: data.map(TypeBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.typeTable.delete({
      where: { public_id: publicId },
    });
  }
}
