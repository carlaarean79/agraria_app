import { HttpException, HttpStatus, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { Repository } from 'typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class PedidoProductoService {
  constructor(
    @InjectRepository(PedidoProducto) private readonly pediProdRepository: Repository<PedidoProducto>,
    @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(datos: PedidoProductoDto): Promise<PedidoProducto> {
    try {
      const pedido = await this.pedidoRepository.findOne({ where: { id: datos.pedido.id } });
      const producto = await this.productoRepository.findOne({ where: { id: datos.producto.id } });

      if (!pedido || !producto) {
        throw new NotFoundException('Pedido o Producto no encontrado');
      }

      const nuevoPedidoProducto = this.pediProdRepository.create({
        cantidad: datos.cantidad,
        producto: datos.producto,
        pedidos: datos.pedido,
      });

      const savedPedidoProducto = await this.pediProdRepository.save(nuevoPedidoProducto);
      return savedPedidoProducto;
    } catch (error) {
      throw new HttpException(`No se pudo crear el PedidoProducto, intente nuevamente en unos segundos. Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<PedidoProducto[]> {
    try {
      const criterio = { relations: ['pedidos', 'producto', 'pedidos.user'] };
      const pedidoProduc = await this.pediProdRepository.find(criterio);
      if (pedidoProduc.length === 0) {
        throw new NotFoundException('No se encontraron pedidos de productos en la base de datos');
      }
      return pedidoProduc;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener los pedidos de productos: ${error.message}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<PedidoProducto> {
    try {
      const criterio = { relations: ['pedidos', 'producto', 'pedidos.user'], where: { id: id } };
      const producto = await this.pediProdRepository.findOne(criterio);
      if (!producto) {
        throw new NotFoundException(`No se encontró el PedidoProducto con id ${id}`);
      }
      return producto;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener el PedidoProducto con id ${id}: ${error.message}`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, datos: PedidoProductoDto): Promise<PedidoProducto> {
    try {
      const pedidoProduc = await this.findOne(id);
      if (!pedidoProduc) {
        throw new NotFoundException(`No se encontró el PedidoProducto con id ${id}`);
      }

      pedidoProduc.cantidad = datos.cantidad;
      // Aquí puedes actualizar otras propiedades si es necesario

      return await this.pediProdRepository.save(pedidoProduc);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar actualizar el PedidoProducto con id ${id}: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const pedidoProduc = await this.findOne(id);
      if (!pedidoProduc) {
        throw new NotFoundException(`No se encontró el PedidoProducto con id ${id}`);
      }
      await this.pediProdRepository.remove(pedidoProduc);
      return `El PedidoProducto con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error al intentar eliminar el PedidoProducto con id ${id}: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
