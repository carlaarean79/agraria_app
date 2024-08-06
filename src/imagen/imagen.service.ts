import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Image } from "./entities/imagen.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { ImagenDto } from "./dto/imagenDto.dto";

@Injectable()
export class ImagenService {
    constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>){}
    async createImagen(datos: ImagenDto): Promise<Image> {
        try {
            const imagenExistente: Image = await this.imageRepository.findOne({ where: { name: datos.name } });
            if (imagenExistente) {
              throw new ConflictException(`La imagen con nombre: ${datos.name} ya existe`)
            }
            const nuevaImagen: Image = await this.imageRepository.save(new Image(datos.name,datos.categoria, datos.url))
            if (nuevaImagen) return nuevaImagen;
            throw new NotFoundException(`No se pudo crear la Imagen ${datos.name}`)
          } catch (error) {
            throw new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: `Se produjo el siguiente error:  ${error} al intentar crear La imagen ${datos.name}`
            }, HttpStatus.NOT_FOUND)
          }
    }


   async  getImagenById(id: number): Promise<Image> {
       try {
      const criterio: FindOneOptions = { where : {id:id}};
      const image: Image = await this.imageRepository.findOne(criterio);
      if (image) return image;
      throw new NotFoundException('No se registraron coincidencias para su búsqueda');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar leer las imagenes en la base de datos;${error} `
      },
        HttpStatus.NOT_FOUND
      )
    }
    }

    async getImagenesPorCategoria(categoria: string): Promise<Image[]> {
      return await this.imageRepository.find({ where: { categoria } });
    }

   async getImagen(): Promise<Image[]> {
    try {
        
        const image: Image[] = await this.imageRepository.find();
        if (image) return image;
        throw new NotFoundException('No se registraron coincidencias para su búsqueda');
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Error al intentar leer las imagenes en la base de datos;${error} `
        },
          HttpStatus.NOT_FOUND
        )
      }
    }


}