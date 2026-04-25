import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateFileDto } from 'src/application/dto/file/create-file.dto';
import { ListFileDto } from 'src/application/dto/file/list-file.dto';
import { UpdateFileDto } from 'src/application/dto/file/update-file.dto';
import { FileHttpMapper } from 'src/application/mapper/file/file-http.mapper';
import { PaginatedResponseMapperDto } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { CreateFileUseCase } from 'src/application/use_case/file/create-file.usecase';
import { DeleteFileUseCase } from 'src/application/use_case/file/delete-file.usecase';
import { GetFileUseCase } from 'src/application/use_case/file/get-file.usecase';
import { ListFileUseCase } from 'src/application/use_case/file/list-file.usecase';
import { UpdateFileUseCase } from 'src/application/use_case/file/update-file.usecase';

@Controller('files')
export class FileControllerAdapter {
  constructor(
    private readonly createFile: CreateFileUseCase,
    private readonly getFile: GetFileUseCase,
    private readonly deleteFile: DeleteFileUseCase,
    private readonly updateFile: UpdateFileUseCase,
    private readonly listFile: ListFileUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateFileDto) {
    const result = await this.createFile.execute(FileHttpMapper.toCreateCommand(dto));
    return FileHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getFile.execute(publicId);
    return FileHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListFileDto) {
    const query = FileHttpMapper.toListQuery(dto);
    const result = await this.listFile.execute(query);

    return PaginatedResponseMapperDto.toDto(result, FileHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateFileDto) {
    const command = FileHttpMapper.toUpdateCommand(dto);
    command.publicId = publicId;

    const result = await this.updateFile.execute(command);
    return FileHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteFile.execute(publicId);
    return { message: 'File deleted successfully' };
  }
}
