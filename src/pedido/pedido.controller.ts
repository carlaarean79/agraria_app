import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}


  @Get()
  @HttpCode(200)
  async getPedido() {
    return this.pedidoService.getPedido();
  }

  @Get(':id')
  @HttpCode(200)
 async getPedidoById(@Param('id', new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
 })) id: number): Promise<Pedido> {
    return  await this.pedidoService.getPedidoById(id);
  }

  @Post()
  @HttpCode(201)
 async createPedido(@Body() datos: CreatePedidoDto):Promise<Pedido> {
  console.log(datos);
  
    return await this.pedidoService.createPedido(datos);
  }


  @Put(':id')
  async updatePedido(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE
    })) id: number, @Body() datos: CreatePedidoDto):Promise<Pedido> {
     return this.pedidoService.updatePedido(id, datos);
   }


  @Delete(':id')
  async removePedido(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}
     )) id: number):Promise<Boolean> {
    return await this.pedidoService.removePedido(id);
  }
}
