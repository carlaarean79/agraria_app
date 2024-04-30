import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, Put } from '@nestjs/common';
import { PedidoProductoService } from './pedido-producto.service';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { PedidoProducto } from './entities/pedido-producto.entity';

@Controller('pedido-producto')
export class PedidoProductoController {
  constructor(private readonly pedidoProductoService: PedidoProductoService) {}

  @Post()
  async createPedidoProducto(@Body() datos: PedidoProductoDto):Promise<PedidoProducto> {
    try{
      return await this.pedidoProductoService.create(datos);
    }catch(error){
      throw new HttpException({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Se produjo un error al intentar crear el pedidoProducto' +error.messaje,
      },HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  @Get()
  @HttpCode(200)
  async findAllPedidoProducto() {
    try{
      return await this.pedidoProductoService.findAll()
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Se produjo un error al obtener todos los Productos Pedidos:`+error.messaje `Intente nuevamente en un instante`,
      },HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @HttpCode(200)
async  findOnePedidoProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number):Promise<PedidoProducto> {
  try{
    return this.pedidoProductoService.findOne(id);
  } catch(error){
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `Se produjo un error al obtener el producto pedido con id ${id}:`+error.messaje `Intente nuevamente en un instante`
    },HttpStatus.INTERNAL_SERVER_ERROR);
  } 
  }
  @Put(':id')
  async updatePedidoProducto(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number, @Body() datos: PedidoProductoDto):Promise<PedidoProducto> {
  try{
    return this.pedidoProductoService.update(id, datos);
  }catch(error){
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `No se pudo actualizar el pedido de productos ${datos.producto} ${error.messaje}`,
    },HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Delete(':id')
  async removePedidoProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number,datos:PedidoProducto):Promise<string> {
 try{
   return this.pedidoProductoService.remove(id, datos);
 }catch(error){
   throw new HttpException({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     error: `Error al eliminar el pedido de productos ${datos.producto} ${error.message} `,
 }, HttpStatus.INTERNAL_SERVER_ERROR);
 }
 }
}
