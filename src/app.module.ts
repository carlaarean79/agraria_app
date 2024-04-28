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





@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'agraria',
    entities: [Entorno,User,Producto,Pedido,PedidoProducto,Categoria],//__dirname + "/entity/*{.js,.ts}"
    synchronize:true
  }), UsersModule, CategoriaModule, ProductoModule, PedidoModule, PedidoProductoModule, EntornoModule,
          
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
