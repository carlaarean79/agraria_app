import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Image } from 'src/imagen/entities/imagen.entity';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Asegúrate de usar el mismo nombre aquí
  async uploadFile(@UploadedFile() image: Express.Multer.File): Promise<Image>{
    if (!image) {
      throw new Error('No file uploaded');
    }
    return await this.uploadService.uploadImage(image);
  }


  @Get()
  async getImages(): Promise<Image[]> {
    return this.uploadService.getImages();
  }
}
