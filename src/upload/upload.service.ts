import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/imagen/entities/imagen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  private readonly imgbbApiKey = '874f276e85e1ad982f67c85f916822f4';

  constructor(private readonly httpService: HttpService,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(image: Express.Multer.File): Promise<Image> {
    const imagePath = image.path;
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
      const imageUrl = response.data.data.url;
      const newImage = this.imageRepository.create({url: imageUrl});
      return this.imageRepository.save(newImage)
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
  }
  async getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }
}
