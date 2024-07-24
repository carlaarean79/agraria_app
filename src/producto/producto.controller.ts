import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/create-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Post()
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
    async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() datos: ProductoDto): Promise<Producto> {
        return this.productoService.update(id, datos);
    }

    @Delete(':id')
    async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<string> {
        return this.productoService.remove(id);
    }
}
