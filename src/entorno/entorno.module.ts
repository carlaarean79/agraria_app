import { Module } from '@nestjs/common';
import { EntornoService } from './entorno.service';
import { EntornoController } from './entorno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entorno } from './entities/entorno.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Entorno])],
  controllers: [EntornoController],
  providers: [EntornoService],
})
export class EntornoModule {}
