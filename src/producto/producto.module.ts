import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports:[TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService, UploadService],
})
export class ProductoModule {}
