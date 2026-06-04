import { Injectable, OnModuleInit } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { FormatDocEnum } from 'src/domain/enums/format-doc.enum';
import { FormatImageEnum } from 'src/domain/enums/format-image.enum';
import { FormatVideoEnum } from 'src/domain/enums/format-video.enum';
import { TypeNameEnum } from 'src/domain/enums/type-name.enum';
import { PrismaService } from './prisma/prisma.service';

const DEFAULT_TYPES = [
  { name: TypeNameEnum.DOC, format: FormatDocEnum.PDF },
  { name: TypeNameEnum.IMAGE, format: FormatImageEnum.PNG },
  { name: TypeNameEnum.VIDEO, format: FormatVideoEnum.MP3 },
] as const;

/** Types par défaut pour le dev local (idempotent). */
@Injectable()
export class TypeBootstrapService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {
    const count = await this.prisma.typeTable.count();
    if (count > 0) return;

    for (const row of DEFAULT_TYPES) {
      await this.prisma.typeTable.create({
        data: {
          public_id: nanoid(),
          name: row.name,
          format: row.format,
        },
      });
    }
  }
}
