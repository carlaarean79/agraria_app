import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class UploadService {
  private readonly imgbbApiKey = '874f276e85e1ad982f67c85f916822f4';

  constructor(private readonly httpService: HttpService) {}

  async uploadImage(imagen: Express.Multer.File): Promise<string> {
    const imagePath = imagen.path;
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');

    const formData = new FormData();
    formData.append('key', this.imgbbApiKey);
    formData.append('image', base64Image);

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post('https://api.imgbb.com/1/upload', formData, {
          headers: {
            ...formData.getHeaders(),
          },
        }),
      );

      fs.unlinkSync(imagePath); // Eliminar el archivo después de subirlo
      return response.data.data.url;
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
  }
}
