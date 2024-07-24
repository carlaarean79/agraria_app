import { HttpException, HttpStatus, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class PedidoProductoService {
  constructor(@InjectRepository(PedidoProducto) private readonly pediProdRepository:Repository<PedidoProducto>,
  @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
  @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>){}

  async create(datos: PedidoProductoDto): Promise<PedidoProducto> {
    try {
      const pedido = await this.pedidoRepository.findOne({ where: { id: datos.pedido.id } });
      const producto = await this.productoRepository.findOne({ where: { id: datos.producto.id } });

      if (!pedido || !producto) {
        throw new NotFoundException(`Pedido o Producto no encontrado`);
      }

      const nuevoPedidoProducto = new PedidoProducto(datos.cantidad, producto, pedido);
      const savedPedidoProducto = await this.pediProdRepository.save(nuevoPedidoProducto);
      return savedPedidoProducto;
    } catch (error) {
      throw new HttpException(`No se pudo crear el PedidoProducto, intente nuevamente en unos segundos`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

   async findAll():Promise<PedidoProducto[]> {
    try{

      let criterio: FindManyOptions = {relations: ['pedido','producto','pedido.user']};
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

    let criterio: FindOneOptions = {relations:['pedido','producto','pedido.user'], where:{id:id}};
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
