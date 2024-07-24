import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>) { }

  async createPedido(datos: CreatePedidoDto): Promise<Pedido> {
    try {
      const user = await this.userRepository.findOne({ where: { id: datos.user.id } });
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
      const saveNewPedido: Pedido = await this.pedidoRepository.save(nuevoPedido);
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
      const criterio: FindManyOptions = {relations: ['pedidosProducto','user','pedidosProducto.producto'] };
      const pedido: Pedido[] = await this.pedidoRepository.find(criterio);
      if (pedido) return pedido;
      throw new NotFoundException('No se registraron coincidencias para su búsqueda');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar leer los pedidos en la base de datos;${error} `
      },
        HttpStatus.NOT_FOUND
      )
    }

  }

  async getPedidoById(id: number): Promise<Pedido> {
    try {
      const criterio: FindOneOptions = ({ relations: ['pedidosProducto','pedidosProducto.producto','user'], where: { id: id } });
      const pedido: Pedido = await this.pedidoRepository.findOne(criterio);
      if (pedido) return pedido;
      throw new NotFoundException(`El pedido con id: ${id} no existe en la base de datos`)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error , al intentar leer los pedido
         ${id} <${error}>`
      }, HttpStatus.NOT_FOUND)
    }
  }

  async updatePedido(id: number, datos: CreatePedidoDto): Promise<Pedido> {
    try {
        const pedidoActualizar: Pedido = await this.getPedidoById(id);
        if (pedidoActualizar) {
            //Object.assign(pedidoActualizar, datos);
            pedidoActualizar.fecha=datos.fecha;
            pedidoActualizar.detalle=datos.detalle;
            const pedidoActualizado: Pedido = await this.pedidoRepository.save(pedidoActualizar);
            return pedidoActualizado;
        } 
    } catch (error) {
        throw new HttpException({ 
            status: HttpStatus.NOT_FOUND,
            error: `Error al intentar actualizar el pedido de id ${id} en la base de datos: ${error}`
        }, HttpStatus.NOT_FOUND);
    }
}

async removePedido(id: number):Promise<Boolean> {
  try {
    const pedidoEliminar:Pedido = await this.getPedidoById(id);
    if (pedidoEliminar) {
       await this.pedidoRepository.remove(pedidoEliminar);
       return true; 
    }
} catch (error) {
    throw new HttpException({ status: HttpStatus.NOT_FOUND,
        error: `Error al intentar eliminar el pedido de id ${id} en la base de datos; ${error}`},
        HttpStatus.NOT_FOUND);
}
  }
}
