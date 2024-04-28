import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntornoService } from './entorno.service';
import { CreateEntornoDto } from './dto/create-entorno.dto';
import { UpdateEntornoDto } from './dto/update-entorno.dto';

@Controller('entorno')
export class EntornoController {
  constructor(private readonly entornoService: EntornoService) {}

  @Post()
  create(@Body() createEntornoDto: CreateEntornoDto) {
    return this.entornoService.create(createEntornoDto);
  }

  @Get()
  findAll() {
    return this.entornoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entornoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntornoDto: UpdateEntornoDto) {
    return this.entornoService.update(+id, updateEntornoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entornoService.remove(+id);
  }
}
