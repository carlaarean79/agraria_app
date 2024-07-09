import { ConflictException, HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>) { }


  async getCategorias(): Promise<Categoria[]> {
    try {
      const criterio: FindManyOptions = { relations: ['productos'] };
      const categoria: Categoria[] = await this.categoriaRepository.find(criterio);
      if (categoria) return categoria;
      throw new NotFoundException('No se registraron coincidencias para su búsqueda');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar leer las categorías en la base de datos;${error} `
      },
        HttpStatus.NOT_FOUND
      )
    }

  }

  async getCategoriaById(id: number): Promise<Categoria> {
    try {
      const criterio: FindOneOptions = ({ relations: ['productos'], where: { id: id } });
      const categoria: Categoria = await this.categoriaRepository.findOne(criterio);
      if (categoria) return categoria;
      throw new NotFoundException(`La categoría con id: ${id} no existe en la base de datos`)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error , al intentar leer los datos referentes a la categoría ${id} <${error}>`
      }, HttpStatus.NOT_FOUND)
    }
  }

  async createCategoria(datos: CreateCategoriaDto): Promise<Categoria> {
    try {
      const categoriaExistente: Categoria = await this.categoriaRepository.findOne({ where: { name: datos.name } });
      if (categoriaExistente) {
        throw new ConflictException(`La categoría con nombre: ${datos.name} ya existe`)
      }
      const nuevaCategoria: Categoria = await this.categoriaRepository.save(new Categoria(datos.name, datos.descripcion))
      if (nuevaCategoria) return nuevaCategoria;
      throw new NotFoundException(`No se pudo crear la categoría ${datos.name}`)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo el siguiente error:  ${error} al intentar crear la categoria ${datos.name}`
      }, HttpStatus.NOT_FOUND)
    }
  }

  async updateCategoria(id: number, datos: CreateCategoriaDto): Promise<Categoria> {
    try {
      let actualizacionCategoria = await this.getCategoriaById(id);
      if (actualizacionCategoria) {
        actualizacionCategoria.name = datos.name;
        actualizacionCategoria.descripcion = datos.descripcion;
        actualizacionCategoria = await this.categoriaRepository.save(actualizacionCategoria);
        return actualizacionCategoria;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar actualizar la categoria de ${id} con el nombre ${datos.name} en la base de datos; ${error}`
      },
        HttpStatus.NOT_FOUND);

    }
  }

 async removeCategoria(id: number):Promise<Boolean> {
  try {
    const categoriaEliminar: Categoria = await this.getCategoriaById(id);
    if (categoriaEliminar) {
       await this.categoriaRepository.remove(categoriaEliminar);
       return true; 
    }
} catch (error) {
    throw new HttpException({ status: HttpStatus.NOT_FOUND,
        error: `Error al intentar eliminar el categoria de id ${id} en la base de datos; ${error}`},
        HttpStatus.NOT_FOUND);
}
  }
}
