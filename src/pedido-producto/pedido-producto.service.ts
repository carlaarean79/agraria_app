import { HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PedidoProductoService {
  constructor(@InjectRepository(PedidoProducto) private readonly pediProdRepository:Repository<PedidoProducto>){}

  async create(datos: PedidoProductoDto):Promise<PedidoProducto> {
  
     try{
       let pediProduc: PedidoProducto;
       if(datos.cantidad ){
         pediProduc = new PedidoProducto(datos.cantidad)
        pediProduc = await this.pediProdRepository.save(pediProduc);
         return pediProduc;
       } else {
         throw new NotFoundException(`Algunos de los campos no está completo o falta algún caracter. Compruebe los datos ingresados e intente nuevamente`);
       }
       
     } catch(error){
 throw new HttpException(`No se puedo crear el producto ${datos.pedido}, intente nuevamente en unos segundos`, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }

   async findAll():Promise<PedidoProducto[]> {
    try{

      let criterio: FindManyOptions = {relations: []};
      const pedidoProduc= await this.pediProdRepository.find(criterio);
      if(pedidoProduc) return pedidoProduc;
      throw new Error(`El fichero aún está vacío. Por favor, primero ingrese una nueva carga de datos`);
    } catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al intentar obtener los campos solicitados. Compruebe los datos ingresados e intente nuevamente`
      }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
)id: number):Promise<PedidoProducto>{
  try{

    let criterio: FindOneOptions = {relations:[], where:{id:id}};
    const producto = await this.pediProdRepository.findOne(criterio);
    if(producto) return producto;
  }catch(error){
    throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Se produjo un error al intentar obtener el campo solicitado con id ${id}. Compruebe los datos ingresados e intente nuevamente` },
    HttpStatus.NOT_FOUND);
}
  }

  async update(id: number, datos:PedidoProductoDto):Promise<PedidoProducto> {
    try{
let pedidoProduc: PedidoProducto= await this.findOne(id);
if(pedidoProduc){
  pedidoProduc.cantidad = datos.cantidad;
 
  pedidoProduc = await this.pediProdRepository.save(pedidoProduc);
  return pedidoProduc;
}
    }catch(error){
      throw new HttpException({ status: HttpStatus.NOT_FOUND,
        error: `Error al intentar actualizar el campo solicitado con id: ${id} en la base de datos; ${error}`},
        HttpStatus.NOT_FOUND);

    }
  }
  async remove(id: number, datos:PedidoProducto):Promise<string> {
    try{
     const removePedProd: PedidoProducto = await this.findOne(id);
     if(!removePedProd) {
       return `El producto que desea eliminar no existe en la base de datos`
     } else{
       await this.pediProdRepository.remove(removePedProd);
       return `El producto ${removePedProd.id} ha sido eliminado correctamente de la base de edatos`
     }
    }catch (error) {
       throw new HttpException({ status: HttpStatus.NOT_FOUND,
           error: `Error al intentar eliminar el campo ${id} en la base de datos; ${error}`},
           HttpStatus.NOT_FOUND);
       }
     }
}
