import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { TypeControllerAdapter } from 'src/adapter/in/type/type.controller.adapter';
import { TypeRepositoryAdapter } from 'src/adapter/out/persistence/type.repository.adapter';
import { CreateTypeUseCase } from 'src/application/use_case/type/create-type.usecase';
import { DeleteTypeUseCase } from 'src/application/use_case/type/delete-type.usecase';
import { GetTypeUseCase } from 'src/application/use_case/type/get-type.usecase';
import { ListTypeUseCase } from 'src/application/use_case/type/list-type.usecase';
import { UpdateTypeUseCase } from 'src/application/use_case/type/update-type.usecase';
import { CreateTypeValidator } from 'src/domain/service/validators/type/create-type.validator';
import { DeleteTypeValidator } from 'src/domain/service/validators/type/delete-type.validator';
import { GetTypeValidator } from 'src/domain/service/validators/type/get-type.validator';
import { ListTypeValidator } from 'src/domain/service/validators/type/list-type.validator';
import { UpdateTypeValidator } from 'src/domain/service/validators/type/update-type.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TypeControllerAdapter],
  providers: [
    {
      provide: 'TypeRepositoryPort',
      useClass: TypeRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateTypeValidator,
    GetTypeValidator,
    ListTypeValidator,
    UpdateTypeValidator,
    DeleteTypeValidator,
    {
      provide: CreateTypeUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateTypeUseCase(repo, validator, idGenerator),
      inject: ['TypeRepositoryPort', CreateTypeValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetTypeUseCase,
      useFactory: (repo, validator) => new GetTypeUseCase(repo, validator),
      inject: ['TypeRepositoryPort', GetTypeValidator],
    },
    {
      provide: ListTypeUseCase,
      useFactory: (repo, validator) => new ListTypeUseCase(repo, validator),
      inject: ['TypeRepositoryPort', ListTypeValidator],
    },
    {
      provide: UpdateTypeUseCase,
      useFactory: (repo, validator) => new UpdateTypeUseCase(repo, validator),
      inject: ['TypeRepositoryPort', UpdateTypeValidator],
    },
    {
      provide: DeleteTypeUseCase,
      useFactory: (repo, validator) => new DeleteTypeUseCase(repo, validator),
      inject: ['TypeRepositoryPort', DeleteTypeValidator],
    },
  ],
  exports: [
    CreateTypeUseCase,
    GetTypeUseCase,
    ListTypeUseCase,
    UpdateTypeUseCase,
    DeleteTypeUseCase,
  ],
})
export class TypeModule {}
