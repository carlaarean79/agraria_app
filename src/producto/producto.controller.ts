import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/create-producto.dto';
import { Producto } from './entities/producto.entity';
import { AdminGuard } from 'src/auth/RolesGuards/AdminGuard';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseGuards(AdminGuard)
  @HttpCode(201)
  async create(@Body() datos: ProductoDto): Promise<Producto> {
    return await this.productoService.create(datos);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Producto[]> {
    return await this.productoService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Producto> {
    return this.productoService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() datos: ProductoDto): Promise<Producto> {
    return this.productoService.update(id, datos);
  }

  @Put(':id/stock')
  @UseGuards(AdminGuard)
  async updateStock(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body('stock') stock: number): Promise<Producto> {
    return this.productoService.updateStock(id, stock);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<string> {
    return this.productoService.remove(id);
  }
}
