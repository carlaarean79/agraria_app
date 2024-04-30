import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { FindOneOptions } from 'typeorm';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() datos: ProductoDto):Promise<Producto>{
    try{
      return await this.productoService.create(datos);
    }catch(error){
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Se produjo un error al intentar crear el producto' +error.messaje,
      },HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  @Get()
  @HttpCode(200)
  async findAllProducto():Promise<Producto[]> {
    try{
      return await this.productoService.findAll()
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Se produjo un error al obtener todos los productos:`+error.messaje `Intente nuevamente en un instante`,
      },HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get(':id')
  @HttpCode(200)
async  findOneProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number):Promise<Producto> {
  try{
    return this.productoService.findOne(id);
  } catch(error){
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `Se produjo un error al obtener el producto con id ${id}:`+error.messaje `Intente nuevamente en un instante`
    },HttpStatus.INTERNAL_SERVER_ERROR);
  } 
  }

  @Put(':id')
  async updateProducto(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number, @Body() datos: ProductoDto):Promise<Producto> {
  try{
    return this.productoService.updateProducto(id, datos);
  }catch(error){
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `No se pudo actualizar el producto ${datos.name} ${error.messaje}`,
    },HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Delete(':id')
   async removeProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number,datos:ProductoDto):Promise<string> {
  try{
    return this.productoService.remove(id, datos);
  }catch(error){
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `Error al eliminar el producto ${datos.name} ${error.message} `,
  }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}
