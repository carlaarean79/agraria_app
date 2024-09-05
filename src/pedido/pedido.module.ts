import { forwardRef, Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Producto } from 'src/producto/entities/producto.entity';
import { PedidoProducto } from 'src/pedido-producto/entities/pedido-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, User, Producto, PedidoProducto]),forwardRef(()=>UsersModule)],
  
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
