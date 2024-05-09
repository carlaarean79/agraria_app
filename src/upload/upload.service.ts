// upload.service.ts

import { Injectable, HttpException, HttpStatus, Options } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  async saveImage(imagen): Promise<string> {
    try {
      if (!imagen) {
        throw new HttpException('No se proporcionó ninguna imagen', HttpStatus.BAD_REQUEST);
      }

      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const imagePath = path.join(uploadsDir, imagen.filename);
      fs.writeFile(imagePath, imagen.buffer, null);

      return imagePath;
    } catch (error) {
      throw new HttpException('Error al guardar la imagen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
