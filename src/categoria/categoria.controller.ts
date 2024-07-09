import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
  @Get()
  @HttpCode(200)
  async getCategorias(): Promise<Categoria[]> {
    return await this.categoriaService.getCategorias();
  }

  @Get(':id')
  @HttpCode(200)
 async getCategoriaById(@Param('id', new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
 })) id: number): Promise<Categoria> {
    return  await this.categoriaService.getCategoriaById(id);
  }

  @Post()
  @HttpCode(201)
 async createCategoria(@Body() datos: CreateCategoriaDto):Promise<Categoria> {
    return await this.categoriaService.createCategoria(datos);
  }



  @Put(':id')
 async updateCategoria(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE
   })) id: number, @Body() datos: CreateCategoriaDto):Promise<Categoria> {
    return this.categoriaService.updateCategoria(id, datos);
  }

  @Delete(':id')
  async removeCategoria(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
     )) id: number):Promise<Boolean> {
    return await this.categoriaService.removeCategoria(id);
  }
}
