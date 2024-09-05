import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Entorno } from 'src/entorno/entities/entorno.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Producto, Categoria,Entorno]),
    ],
    controllers: [ProductoController],
    providers: [ProductoService],
   
})
export class ProductoModule {}
