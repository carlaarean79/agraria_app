import { Module } from '@nestjs/common';
import { ImagenController } from './imagen.controller';
import { ImagenService } from './imagen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/imagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
