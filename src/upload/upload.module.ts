import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Producto } from 'src/producto/entities/producto.entity';


@Module({
  
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
