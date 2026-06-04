import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './adapter/in/file/file.module';
import { TypeModule } from './adapter/in/type/type.module';

@Module({
  imports: [FileModule, TypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
