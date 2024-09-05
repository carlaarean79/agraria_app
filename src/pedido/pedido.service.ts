import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Producto } from 'src/producto/entities/producto.entity';
import { PedidoProducto } from 'src/pedido-producto/entities/pedido-producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
    private readonly userService: UsersService, 
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
    @InjectRepository(PedidoProducto) private readonly pedidoProductoRepository: Repository<PedidoProducto>,
  ) {}

 
 async createPedido(datos: CreatePedidoDto): Promise<Pedido> {
    try {
      // Verificar y obtener el usuario
      const user: User = await this.userService.findOne(datos.user.id);
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Usuario no encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
  
      // Crear el nuevo pedido
      const nuevoPedido: Pedido = new Pedido(datos.fecha, datos.detalle, user);
      const saveNewPedido: Pedido = await this.pedidoRepository.save(nuevoPedido);
  
      // Procesar los productos del pedido
      for (const productoPedido of datos.pedidoProducto) {
        // Buscar el producto
        const producto = await this.productoRepository.findOneBy({ id: productoPedido.producto.id });
        if (!producto) {
          throw new Error(`Producto con ID ${productoPedido.producto.id} no encontrado`);
        }
       

        // Verificar si hay suficiente stock
        if (producto.stock < productoPedido.cantidad) {
          throw new Error(
            `No hay suficiente stock para el producto ${producto.name}`
      
          );
        }
  
        // Reducir el stock
        producto.stock -= productoPedido.cantidad;
        await this.productoRepository.save(producto);
  
        // Crear el PedidoProducto
        const pedidoProducto = new PedidoProducto(productoPedido.cantidad, producto, saveNewPedido);
        await this.pedidoProductoRepository.save(pedidoProducto);
      }
  
      return saveNewPedido;
    } catch (error) {
    /*   throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error al intentar crear el pedido: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); */
      
      console.error('Error al crear pedido:', error);
    }
  }
  
  
  async getPedido(): Promise<Pedido[]> {
    try {
      const criterio: FindManyOptions = { relations: ['pedidProducto', 'pedidProducto.producto', 'user'] };
      const pedido: Pedido[] = await this.pedidoRepository.find(criterio);
      if (pedido) return pedido;
      throw new NotFoundException('No se registraron coincidencias para su búsqueda');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar leer los pedidos en la base de datos; ${error.message}`
      }, HttpStatus.NOT_FOUND);
    }
  }
  
  async getPedidoById(id: number): Promise<Pedido> {
    try {
      const criterio: FindOneOptions = { relations: ['pedidProducto', 'pedidProducto.producto', 'user'], where: { id } };
      const pedido: Pedido = await this.pedidoRepository.findOne(criterio);
      if (pedido) return pedido;
      throw new NotFoundException(`El pedido con id: ${id} no existe en la base de datos`);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar obtener el pedido con id ${id}; ${error.message}`
      }, HttpStatus.NOT_FOUND);
    }
  }

  async updatePedido(id: number, datos: CreatePedidoDto): Promise<Pedido> {
    try {
      const pedidoActualizar = await this.getPedidoById(id);
      if (!pedidoActualizar) {
        throw new NotFoundException(`El pedido con id ${id} no se encontró`);
      }

      pedidoActualizar.fecha = datos.fecha;
      pedidoActualizar.detalle = datos.detalle;

      const pedidoActualizado = await this.pedidoRepository.save(pedidoActualizar);
      return pedidoActualizado;
    } catch (error) {
      throw new HttpException(
        `Error al intentar actualizar el pedido con id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePedido(id: number): Promise<boolean> {
    try {
      const pedidoEliminar = await this.getPedidoById(id);
      if (!pedidoEliminar) {
        throw new NotFoundException(`El pedido con id ${id} no se encontró`);
      }
  
      console.log(`Pedido encontrado: ${JSON.stringify(pedidoEliminar)}`);
      
      await this.pedidoRepository.remove(pedidoEliminar);
      
      console.log(`Pedido con id ${id} eliminado correctamente`);
      
      return true;
    } catch (error) {
      console.error(`Error al intentar eliminar el pedido con id ${id}:`, error);
      throw new HttpException(
        `Error al intentar eliminar el pedido con id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}

  

 

 

