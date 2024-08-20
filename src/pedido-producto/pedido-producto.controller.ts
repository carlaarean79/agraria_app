import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, Put } from '@nestjs/common';
import { PedidoProductoService } from './pedido-producto.service';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { PedidoProducto } from './entities/pedido-producto.entity';

@Controller('pedido-producto')
export class PedidoProductoController {
  constructor(private readonly pedidoProductoService: PedidoProductoService) {}

  @Post()
  async createPedidoProducto(@Body() datos: PedidoProductoDto):Promise<PedidoProducto> {
          return await this.pedidoProductoService.create(datos);
      }

  @Get()
  @HttpCode(200)
  async findAllPedidoProducto():Promise<PedidoProducto[]> {
        return await this.pedidoProductoService.findAll()
     }

  @Get(':id')
  @HttpCode(200)
async  findOnePedidoProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number):Promise<PedidoProducto> {
      return this.pedidoProductoService.findOne(id);
    }


  @Put(':id')
  async updatePedidoProducto(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number, @Body() datos: PedidoProductoDto):Promise<PedidoProducto> {
     return this.pedidoProductoService.update(id, datos);
   }

  @Delete(':id')
  async removePedidoProducto(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
) id: number,datos:PedidoProducto):Promise<string> {
    return this.pedidoProductoService.remove(id);
}
}
