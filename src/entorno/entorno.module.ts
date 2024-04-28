import { Module } from '@nestjs/common';
import { EntornoService } from './entorno.service';
import { EntornoController } from './entorno.controller';

@Module({
  controllers: [EntornoController],
  providers: [EntornoService],
})
export class EntornoModule {}
