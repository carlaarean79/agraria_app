import { HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ProductoDto } from './dto/create-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductoService {
    constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) {}

    async create(datos: ProductoDto): Promise<Producto> {
        try {
            const nuevoProducto: Producto = await this.productoRepository.save(new Producto(
                datos.name, datos.descripcion, datos.imagen, datos.price, datos.categoria, datos.entorno
            ));
            if (nuevoProducto) return nuevoProducto;
            throw new NotFoundException(`No se pudo crear el producto con nombre ${datos.name}`);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Error al intentar crear el producto de nombre ${datos.name} en la base de datos; ${error}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Producto[]> {
        try {
            let criterio: FindManyOptions = { relations: ['entorno', 'categoria'] };
            const productos = await this.productoRepository.find(criterio);
            if (productos) return productos;
            throw new NotFoundException('No se encontraron productos en la base de datos');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Error al intentar obtener los productos: ${error}`,
            }, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number): Promise<Producto> {
        try {
            let criterio: FindOneOptions = { relations: ['entorno', 'categoria'], where: { id: id } };
            const producto = await this.productoRepository.findOne(criterio);
            if (producto) return producto;
            throw new NotFoundException(`No se encontró el producto con id ${id}`);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Error al intentar obtener el producto con id ${id}: ${error}`,
            }, HttpStatus.NOT_FOUND);
        }
    }

    async update(id: number, datos: ProductoDto): Promise<Producto> {
        try {
            let producto: Producto = await this.findOne(id)
            if (!producto) {
                throw new NotFoundException(`No se encontró el producto con id ${id}`);
            }
            producto.name = datos.name;
            producto.descripcion = datos.descripcion;
            producto.imagen = datos.imagen;
            producto.price = datos.price;
            producto.categoria = datos.categoria;
            producto.entorno = datos.entorno;

            return await this.productoRepository.save(producto);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Error al intentar actualizar el producto con id ${id}: ${error}`,
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
                error: `Error al intentar eliminar el producto con id ${id}: ${error}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
