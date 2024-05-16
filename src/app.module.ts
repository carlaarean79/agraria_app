import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoProductoModule } from './pedido-producto/pedido-producto.module';
import { Pedido } from './pedido/entities/pedido.entity';
import { PedidoProducto } from './pedido-producto/entities/pedido-producto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { Producto } from './producto/entities/producto.entity';
import { EntornoModule } from './entorno/entorno.module';
import { Entorno } from './entorno/entities/entorno.entity';
import { FormaPagoModule } from './forma-pago/forma-pago.module';






@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'cockroachdb',
    host: 'cool-ferret-14700.7tt.aws-us-east-1.cockroachlabs.cloud',
    port: 26257,
    username: 'agraria',
    password: 'x8Lu46JzUHXWez1YaUYpLA',
    database: 'agraria',
    ssl: true,
    entities: [Entorno,User,Producto,Pedido,PedidoProducto,Categoria],//__dirname + "/entity/*{.js,.ts}"
    synchronize:true
  }), UsersModule, CategoriaModule, ProductoModule, PedidoModule, PedidoProductoModule, EntornoModule, FormaPagoModule          
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
