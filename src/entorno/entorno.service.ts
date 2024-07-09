import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntornoDto } from './dto/create-entorno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entorno } from './entities/entorno.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EntornoService {
  constructor(@InjectRepository(Entorno) private readonly entornoRepository: Repository<Entorno>) { }

  async createEntorno(datos: CreateEntornoDto): Promise<Entorno> {
    try {
      const entornoExistente: Entorno = await this.entornoRepository.findOne({ where: { name: datos.name } });
      if (entornoExistente) {
        throw new ConflictException(`El entorno con nombre: ${datos.name} ya existe`)
      }
      const nuevaCategoria: Entorno = await this.entornoRepository.save(new Entorno(datos.name))
      if (nuevaCategoria) return nuevaCategoria;
      throw new NotFoundException(`No se pudo crear la categoría ${datos.name}`)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo el siguiente error:  ${error} al intentar crear el entorno ${datos.name}`
      }, HttpStatus.NOT_FOUND)
    }
  }

  async getEntorno(): Promise<Entorno[]> {
    try {
      const criterio: FindManyOptions = { relations: ['productos'] };
      const entorno: Entorno[] = await this.entornoRepository.find(criterio);
      if (entorno) return entorno;
      throw new NotFoundException('No se registraron coincidencias para su búsqueda');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar leer los entornos en la base de datos;${error} `
      },
        HttpStatus.NOT_FOUND
      )
    }

  }
  async getEntornoById(id: number): Promise<Entorno> {
    try {
      const criterio: FindOneOptions = ({ relations: ['productos'], where: { id: id } });
      const entorno: Entorno = await this.entornoRepository.findOne(criterio);
      if (entorno) return entorno;
      throw new NotFoundException(`El entorno con id: ${id} no existe en la base de datos`)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error , al intentar leer los datos referentes a el entorno ${id} <${error}>`
      }, HttpStatus.NOT_FOUND)
    }
  }

 async updateEntorno(id: number, datos: CreateEntornoDto): Promise<Entorno> {
    try {
      let actualizacionEntorno = await this.getEntornoById(id);
      if (actualizacionEntorno) {
        actualizacionEntorno.name = datos.name;;
        actualizacionEntorno = await this.entornoRepository.save(actualizacionEntorno);
        return actualizacionEntorno;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar actualizar el entorno de ${id} con el nombre ${datos.name} en la base de datos; ${error}`
      },
        HttpStatus.NOT_FOUND);

    }
  }

  async removeEntorno(id: number):Promise<Boolean> {
    try {
      const cEntornoEliminar: Entorno = await this.getEntornoById(id);
      if (cEntornoEliminar) {
         await this.entornoRepository.remove(cEntornoEliminar);
         return true; 
      }
  } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND,
          error: `Error al intentar eliminar el categoria de id ${id} en la base de datos; ${error}`},
          HttpStatus.NOT_FOUND);
  }
    }
}
