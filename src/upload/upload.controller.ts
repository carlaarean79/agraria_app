import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Asegúrate de usar el mismo nombre aquí
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new Error('No file uploaded');
    }
    const imageUrl = await this.uploadService.uploadImage(image);
    return { imageUrl }; // Devolver la URL de la imagen en la respuesta
  }
}
