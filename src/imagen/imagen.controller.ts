import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ImagenService } from "./imagen.service";
import { Image } from "./entities/imagen.entity";
import { ImagenDto } from "./dto/imagenDto.dto";

@Controller('imagen')
export class ImagenController {
    constructor(private readonly imagenService: ImagenService){}

    @Get()
    @HttpCode(200)
    async getPedido(@Query('categoria') categoria: string) {
      if (categoria) {
        return this.imagenService.getImagenesPorCategoria(categoria);
      }
      return this.imagenService.getImagen();
    }
    
  
    @Get(':id')
    @HttpCode(200)
   async getImagenById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
   })) id: number): Promise<Image> {
      return  await this.imagenService.getImagenById(id);
    }
  
    @Post()
    @HttpCode(201)
   async createImagen(@Body() datos: ImagenDto):Promise<Image> {
      return await this.imagenService.createImagen(datos);
    }

   
}


