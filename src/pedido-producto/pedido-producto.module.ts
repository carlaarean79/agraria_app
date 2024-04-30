import { Module } from '@nestjs/common';
import { PedidoProductoService } from './pedido-producto.service';
import { PedidoProductoController } from './pedido-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PedidoProducto])],
  controllers: [PedidoProductoController],
  providers: [PedidoProductoService],
})
export class PedidoProductoModule {}
