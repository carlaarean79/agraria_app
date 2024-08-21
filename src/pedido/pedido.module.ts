import { forwardRef, Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, User]),forwardRef(()=>UsersModule)],
  
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
