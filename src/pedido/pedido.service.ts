import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UsersService
  ) {}

  async createPedido(datos: CreatePedidoDto): Promise<Pedido> {
    try {
      
      const user: User = await this.userService.findOne(datos.user.id );
      console.log(datos.user.id);
      console.log(user);
      
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Usuario no encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
  
      const nuevoPedido: Pedido = new Pedido(datos.fecha, datos.detalle, user);
      console.log(nuevoPedido + "nuevo pedido");
      
      
      const saveNewPedido: Pedido = await this.pedidoRepository.save(nuevoPedido);
      console.log("pedido guardado" + saveNewPedido);
      return saveNewPedido;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error al intentar crear el pedido: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async getPedido(): Promise<Pedido[]> {
    try {
      const criterio: FindManyOptions = { relations: ['pedidoProducto', 'pedidProducto.producto', 'user'] };
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
      const criterio: FindOneOptions = { relations: ['pedidoProducto', 'pedidProducto.producto', 'user'], where: { id } };
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

      await this.pedidoRepository.remove(pedidoEliminar);
      return true;
    } catch (error) {
      throw new HttpException(
        `Error al intentar eliminar el pedido con id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
