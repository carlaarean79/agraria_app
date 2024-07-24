import { Module } from '@nestjs/common';
import { PedidoProductoService } from './pedido-producto.service';
import { PedidoProductoController } from './pedido-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoProducto, Pedido, Producto])],
  controllers: [PedidoProductoController],
  providers: [PedidoProductoService],
})
export class PedidoProductoModule {}
