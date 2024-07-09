import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { EntornoService } from './entorno.service';
import { CreateEntornoDto } from './dto/create-entorno.dto';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Entorno } from './entities/entorno.entity';

@Controller('entorno')
export class EntornoController {
  constructor(private readonly entornoService: EntornoService) {}
  @Get()
  @HttpCode(200)
  async getEntorno() {
    return this.entornoService.getEntorno();
  }

  @Get(':id')
  @HttpCode(200)
 async getCategoriaById(@Param('id', new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
 })) id: number): Promise<Entorno> {
    return  await this.entornoService.getEntornoById(id);
  }

  @Post()
  @HttpCode(201)
 async createCategoria(@Body() datos: CreateEntornoDto):Promise<Entorno> {
    return await this.entornoService.createEntorno(datos);
  }


  @Put(':id')
 async updateCategoria(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE
   })) id: number, @Body() datos: CreateEntornoDto):Promise<Entorno> {
    return this.entornoService.updateEntorno(id, datos);
  }

  @Delete(':id')
  async removeCategoria(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
     )) id: number):Promise<Boolean> {
    return await this.entornoService.removeEntorno(id);
  }
}
