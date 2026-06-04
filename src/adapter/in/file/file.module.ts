import { Module } from '@nestjs/common';
import { FileControllerAdapter } from 'src/adapter/in/file/file.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { FileRepositoryAdapter } from 'src/adapter/out/persistence/file.repository.adapter';
import { CreateFileUseCase } from 'src/application/use_case/file/create-file.usecase';
import { DeleteFileUseCase } from 'src/application/use_case/file/delete-file.usecase';
import { GetFileUseCase } from 'src/application/use_case/file/get-file.usecase';
import { ListFileUseCase } from 'src/application/use_case/file/list-file.usecase';
import { UpdateFileUseCase } from 'src/application/use_case/file/update-file.usecase';
import { CreateFileValidator } from 'src/domain/service/validators/file/create-file.validator';
import { DeleteFileValidator } from 'src/domain/service/validators/file/delete-file.validator';
import { GetFileValidator } from 'src/domain/service/validators/file/get-file.validator';
import { ListFileValidator } from 'src/domain/service/validators/file/list-file.validator';
import { UpdateFileValidator } from 'src/domain/service/validators/file/update-file.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FileControllerAdapter],
  providers: [
    {
      provide: 'FileRepositoryPort',
      useClass: FileRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateFileValidator,
    GetFileValidator,
    ListFileValidator,
    UpdateFileValidator,
    DeleteFileValidator,
    {
      provide: CreateFileUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateFileUseCase(repo, validator, idGenerator),
      inject: ['FileRepositoryPort', CreateFileValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetFileUseCase,
      useFactory: (repo, validator) => new GetFileUseCase(repo, validator),
      inject: ['FileRepositoryPort', GetFileValidator],
    },
    {
      provide: ListFileUseCase,
      useFactory: (repo, validator) => new ListFileUseCase(repo, validator),
      inject: ['FileRepositoryPort', ListFileValidator],
    },
    {
      provide: UpdateFileUseCase,
      useFactory: (repo, validator) => new UpdateFileUseCase(repo, validator),
      inject: ['FileRepositoryPort', UpdateFileValidator],
    },
    {
      provide: DeleteFileUseCase,
      useFactory: (repo, validator) => new DeleteFileUseCase(repo, validator),
      inject: ['FileRepositoryPort', DeleteFileValidator],
    },
  ],
  exports: [
    CreateFileUseCase,
    GetFileUseCase,
    ListFileUseCase,
    UpdateFileUseCase,
    DeleteFileUseCase,
  ],
})
export class FileModule {}
