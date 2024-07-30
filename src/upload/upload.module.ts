import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/imagen/entities/imagen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      dest: './uploads', // Cambiado a 'uploads' para coincidir con el controlador
    }),
    HttpModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
