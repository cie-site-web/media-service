import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTypeDto } from 'src/application/dto/type/create-type.dto';
import { ListTypeDto } from 'src/application/dto/type/list-type.dto';
import { UpdateTypeDto } from 'src/application/dto/type/update-type.dto';
import { PaginatedResponseMapperDto } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { TypeHttpMapper } from 'src/application/mapper/type/type-http.mapper';
import { CreateTypeUseCase } from 'src/application/use_case/type/create-type.usecase';
import { DeleteTypeUseCase } from 'src/application/use_case/type/delete-type.usecase';
import { GetTypeUseCase } from 'src/application/use_case/type/get-type.usecase';
import { ListTypeUseCase } from 'src/application/use_case/type/list-type.usecase';
import { UpdateTypeUseCase } from 'src/application/use_case/type/update-type.usecase';

@Controller('types')
export class TypeControllerAdapter {
  constructor(
    private readonly createType: CreateTypeUseCase,
    private readonly getType: GetTypeUseCase,
    private readonly deleteType: DeleteTypeUseCase,
    private readonly updateType: UpdateTypeUseCase,
    private readonly listType: ListTypeUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTypeDto) {
    const result = await this.createType.execute(TypeHttpMapper.toCreateCommand(dto));
    return TypeHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getType.execute(publicId);
    return TypeHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListTypeDto) {
    const query = TypeHttpMapper.toListQuery(dto);
    const result = await this.listType.execute(query);

    return PaginatedResponseMapperDto.toDto(result, TypeHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateTypeDto) {
    const command = TypeHttpMapper.toUpdateCommand(dto);
    command.publicId = publicId;

    const result = await this.updateType.execute(command);
    return TypeHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteType.execute(publicId);
    return { message: 'Type deleted successfully' };
  }
}
