import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductoDto } from './dto/create-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) {}

  async create(datos: ProductoDto): Promise<Producto> {
    try {
      const nuevoProducto = this.productoRepository.create({
        ...datos,
        stock: datos.stock || 0, // Asegurarse de establecer un valor predeterminado para el stock
      });

      const productoGuardado = await this.productoRepository.save(nuevoProducto);
      if (!productoGuardado) {
        throw new NotFoundException(`No se pudo crear el producto con nombre ${datos.name}`);
      }
      return productoGuardado;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar crear el producto: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Producto[]> {
    try {
      let criterio: FindManyOptions = { relations: ['entorno', 'categoria'] };
      const productos = await this.productoRepository.find(criterio);
      if (productos.length === 0) {
        throw new NotFoundException('No se encontraron productos en la base de datos');
      }
      return productos;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener los productos: ${error.message}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<Producto> {
    try {
      let criterio: FindOneOptions = { relations: ['entorno', 'categoria'], where: { id: id } };
      const producto = await this.productoRepository.findOne(criterio);
      if (!producto) {
        throw new NotFoundException(`No se encontró el producto con id ${id}`);
      }
      return producto;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener el producto con id ${id}: ${error.message}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, datos: ProductoDto): Promise<Producto> {
    try {
      let producto: Producto = await this.findOne(id);
      if (!producto) {
        throw new NotFoundException(`No se encontró el producto con id ${id}`);
      }

      producto = { ...producto, ...datos };

      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar actualizar el producto con id ${id}: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const producto: Producto = await this.findOne(id);
      if (!producto) {
        throw new NotFoundException(`No se encontró el producto con id ${id}`);
      }
      await this.productoRepository.remove(producto);
      return `El producto con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar eliminar el producto con id ${id}: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStock(id: number, stock: number): Promise<Producto> {
    try {
      const producto = await this.findOne(id);
      if (!producto) {
        throw new NotFoundException(`No se encontró el producto con id ${id}`);
      }

      if (stock < 0) {
        throw new BadRequestException('El stock no puede ser negativo');
      }

      producto.stock = stock;
      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar actualizar el stock del producto con id ${id}: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
