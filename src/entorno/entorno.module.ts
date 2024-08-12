import { Module } from '@nestjs/common';
import { EntornoService } from './entorno.service';
import { EntornoController } from './entorno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entorno } from './entities/entorno.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Entorno, Producto])],
  controllers: [EntornoController],
  providers: [EntornoService],
})
export class EntornoModule {}
