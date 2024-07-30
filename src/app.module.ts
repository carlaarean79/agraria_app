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
import { UploadModule } from './upload/upload.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WhatsappSendModule } from './whatsapp-send/whatsapp-send.module';
import { Image } from './imagen/entities/imagen.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'cockroachdb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: true,
        entities: [Entorno, User, Producto, Pedido, PedidoProducto, Categoria, Image],//__dirname + "/entity/*{.js,.ts}"
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule, CategoriaModule,
     ProductoModule, PedidoModule, 
     PedidoProductoModule, EntornoModule, 
     UploadModule, NodemailerModule, WhatsappSendModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
